import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "react-use";
import { fetchLinks } from "../api/link";
import Layout from "../components/Layout";
import UrlTable from "../components/LinkTable";
import { QUERY_KEYS } from "../config/constants";
import useAuth from "../hooks/useAuth";
import TextField from "../nsw/ui/components/TextField";
import Typography from "../nsw/ui/components/Typography";
import { Paths } from "../paths";

const Dashboard = () => {
  const { user } = useAuth({ redireactIfUnauthenticated: Paths.LOGIN });
  const [query, setQuery] = React.useState({
    keyword: "",
  });
  const [searchValue, setSearchValue] = React.useState<string>("");
  const { data, isLoading, isError } = useQuery(
    [QUERY_KEYS.LINKS, query],
    () => fetchLinks({ params: query.keyword ? query : undefined }),
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
  function handleChangeSearchInput(
    event: React.FormEvent<HTMLInputElement>,
  ): void {
    const value = event.currentTarget.value.trim();

    setQuery((pre) => ({ ...pre, keyword: value ? value : "" }));
    // setSearchValue(event.currentTarget.value.trim());
  }

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

              <UrlTable urls={data.data} />
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
