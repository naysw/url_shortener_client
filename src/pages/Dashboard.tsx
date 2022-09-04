import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "react-use";
import { fetchLinks } from "../api/link";
import Layout from "../components/Layout";
import LinkTable from "../components/LinkTable";
import Pagination from "../components/Pagination";
import QueryStateHandler from "../components/QueryStateHandler";
import { DEFAULT_TAKE } from "../config/app";
import { QUERY_KEYS } from "../config/constants";
import useAuth from "../hooks/useAuth";
import TextField from "../nsw/ui/components/TextField";
import Typography from "../nsw/ui/components/Typography";
import { Paths } from "../paths";

const Dashboard = () => {
  const { user } = useAuth({ redireactIfUnauthenticated: Paths.LOGIN });
  const [query, setQuery] = React.useState({
    skip: 0,
    take: DEFAULT_TAKE,
    keyword: "",
    orderBy: "createdAt=desc",
  });
  const [searchValue, setSearchValue] = React.useState<string>("");
  const { status, error, data } = useQuery(
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
    setQuery((pre) => ({ ...pre, skip: pre.skip + DEFAULT_TAKE }));
  };

  const handleChangePre = () => {
    if (query.skip === 0) return;

    setQuery((pre) => ({ ...pre, skip: pre.skip - DEFAULT_TAKE }));
  };

  return (
    <Layout>
      {user ? (
        <>
          <div className="flex">
            <div className="text-2xl mr-1">Welcome</div>
            <Typography variant="h4" className="mb-4">
              {user?.name}
            </Typography>
          </div>

          <QueryStateHandler
            status={status}
            error={error}
            data={data}
            renderLoading={<div>Loading</div>}
          >
            {({ data: links }: any) => (
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
                  <LinkTable urls={links} setQuery={setQuery} />
                </div>

                <div className="flex items-center mt-6">
                  <div className="flex-1">Showing {links.length}</div>

                  <Pagination
                    hasPrePage={Boolean(query.skip === 0)}
                    hasNextPage={Boolean(links.length >= DEFAULT_TAKE)}
                    count={20}
                    onNext={handleChangeNext}
                    onPre={handleChangePre}
                  />
                </div>
              </div>
            )}
          </QueryStateHandler>
        </>
      ) : (
        <>Loading</>
      )}
    </Layout>
  );
};

export default Dashboard;
