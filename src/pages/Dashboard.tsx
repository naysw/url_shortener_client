import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDebounce } from "react-use";
import { fetchLinks } from "../api/link";
import Layout from "../components/Layout";
import LinkTable from "../components/LinkTable";
import Pagination from "../components/Pagination";
import QueryStateHandler from "../components/QueryStateHandler";
import { DEFAULT_TAKE } from "../config/app";
import { QUERY_KEYS } from "../config/constants";
import useAuth from "../hooks/useAuth";
import TableSkeleton from "../nsw/components/TableSkeleton";
import TextField from "../nsw/ui/components/TextField";
import Typography from "../nsw/ui/components/Typography";
import { Paths } from "../paths";
import { OrderBy, Query } from "../types";

const Dashboard = () => {
  const { user } = useAuth({ redireactIfUnauthenticated: Paths.LOGIN });
  const [queryState, setQueryState] = React.useState<Query<OrderBy>>({
    skip: 0,
    take: DEFAULT_TAKE,
    keyword: "",
    orderBy: "createdAt=desc",
  });
  const [searchValue, setSearchValue] = React.useState<string>("");
  const { status, error, data, isRefetching } = useQuery(
    [QUERY_KEYS.LINKS, queryState],
    () =>
      fetchLinks({
        params: {
          skip: queryState.skip,
          take: queryState.take,
          keyword: queryState.keyword || undefined,
          orderBy: queryState.orderBy || undefined,
        },
      }),
  );

  useDebounce(
    () => {
      setQueryState((pre) => ({ ...pre, keyword: searchValue }));
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
    setSearchValue(event.currentTarget.value.trim());
  };

  /**
   * handle onChange next page
   * add default take number to previous skip number
   *
   * @return void
   */
  const handleChangeNext = (): void => {
    setQueryState((pre) => ({ ...pre, skip: Number(pre.skip) + DEFAULT_TAKE }));
  };

  /**
   * handle onChange pre page
   * minus default take number from previous skip number
   *
   * @returns void
   */
  const handleChangePre = () => {
    if (queryState.skip === 0) return;

    setQueryState((pre) => ({ ...pre, skip: Number(pre.skip) - DEFAULT_TAKE }));
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
            renderLoading={<TableSkeleton />}
          >
            {({ data: links }: any) => (
              <div>
                <div className="mb-6">
                  <TextField
                    value={searchValue}
                    onChange={handleChangeSearchInput}
                    type="search"
                    inputSize="small"
                    placeholder="Search"
                  />
                </div>

                <div className="overflow-x-auto">
                  <LinkTable
                    urls={links}
                    queryState={queryState}
                    setQueryState={setQueryState}
                    loading={isRefetching}
                  />
                </div>

                <div className="flex items-center mt-6">
                  <div className="flex-1">Showing {links.length}</div>

                  <Pagination
                    hasPrePage={Boolean(queryState.skip === 0)}
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
