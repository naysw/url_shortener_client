import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "react-use";
import { fetchLinks } from "../api/link";
import Layout from "../components/Layout";
import LinkTable from "../components/LinkTable";
import Pagination from "../components/Pagination";
import { QUERY_KEYS } from "../config/constants";
import useAuth from "../hooks/useAuth";
import TextField from "../nsw/ui/components/TextField";
import Typography from "../nsw/ui/components/Typography";
import { Paths } from "../paths";

const TAKE_PER_PAGE = 3;

const Dashboard = () => {
  const { user } = useAuth({ redireactIfUnauthenticated: Paths.LOGIN });
  const [query, setQuery] = React.useState({
    skip: 0,
    take: TAKE_PER_PAGE,
    keyword: "",
    orderBy: "createdAt",
  });
  const [searchValue, setSearchValue] = React.useState<string>("");
  const { data, isLoading, isError } = useQuery(
    [QUERY_KEYS.LINKS, query],
    () =>
      fetchLinks({
        params: {
          skip: query.skip,
          take: query.take,
          keyword: query.keyword || undefined,
          orderBy: query.orderBy || undefined,
        },
      }),
    // {
    //   enabled: Boolean(keyword),
    // },
  );

  const [] = useDebounce(
    () => {
      setQuery((pre) => ({ ...pre, keyword: searchValue }));
    },
    500,
    [searchValue],
  );

  /**
   * handle change search input
   *
   * @param event React.FormEvent<HTMLInputElement>
   */
  const handleChangeSearchInput = (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const value = event.currentTarget.value.trim();

    setQuery((pre) => ({ ...pre, keyword: value ? value : "" }));
    // setSearchValue(event.currentTarget.value.trim());
  };

  const handleChangeNext = () => {
    setQuery((pre) => ({ ...pre, skip: pre.skip + TAKE_PER_PAGE }));
  };

  const handleChangePre = () => {
    if (query.skip === 0) return;

    setQuery((pre) => ({ ...pre, skip: pre.skip - TAKE_PER_PAGE }));
  };

  return (
    <Layout>
      {user ? (
        <>
          <Typography variant="h4" className="mb-4">
            Welcome {user?.name}
          </Typography>

          {data && !isLoading && !isError ? (
            <div>
              <div className="my-4 flex">
                <div className="flex-1">
                  <Link
                    to={{
                      pathname: "/admin",
                      search: "?orderBy=visits",
                    }}
                  >
                    Popular
                  </Link>
                </div>
                <TextField
                  onChange={handleChangeSearchInput}
                  type="search"
                  inputSize="small"
                  placeholder="Search"
                />
              </div>

              <div className="overflow-x-auto">
                <LinkTable urls={data.data} />
              </div>

              <div className="flex items-center mt-6">
                <div className="flex-1">Showing {data.data.length}</div>

                <Pagination
                  hasPrePage={Boolean(query.skip === 0)}
                  hasNextPage={Boolean(data.data.length)}
                  count={20}
                  onNext={handleChangeNext}
                  onPre={handleChangePre}
                />
              </div>
            </div>
          ) : (
            <div>Loading</div>
          )}
        </>
      ) : (
        <>Loading</>
      )}
    </Layout>
  );
};

export default Dashboard;
