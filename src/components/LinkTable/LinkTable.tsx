import { ChartBarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import React from "react";
import { Column } from "react-table";
import { toast } from "react-toastify";
import { useDeleteLinkMutation } from "../../hooks/useDeleteLinkMutation";
import DataTable from "../../nsw/components/DataTable";
import IconButton from "../../nsw/ui/components/IconButton";
import LinearProgress from "../../nsw/ui/components/LinearProgress";
import Typography from "../../nsw/ui/components/Typography";
import { LinkModel, OrderBy, Query } from "../../types";
import { getShortName } from "../../utils/string";
import CopyButton from "../CopyButton";
import TableHeader from "../TableHeader";
import { useUI } from "../UIContext/UIContext";

interface Props {
  urls: LinkModel[];
  queryState: Query<OrderBy>;
  setQueryState: React.Dispatch<React.SetStateAction<Query<OrderBy>>>;
  loading?: boolean;
}

const LinkTable = ({ urls, queryState, setQueryState, loading }: Props) => {
  const { mutate, isLoading: isDeleting } = useDeleteLinkMutation();
  const { setDialog } = useUI();

  /**
   * handle view link details and statistics
   *
   * @return void
   */
  const handleViewDetails = React.useCallback((urlId: string) => {
    setDialog({ name: "LINK_STATISTICS_DIALOG", data: urlId });
  }, []);

  /**
   * handle delete given url id, require window confirm
   *
   * @reutrn void
   */
  const handleDelete = React.useCallback((urlId: string) => {
    if (window.confirm("Are you sure you want to delete ?"))
      mutate(urlId, {
        onSuccess: () => toast.success("Link deleted successfully"),
        onError: (error: any) =>
          toast.error(
            error?.message || "Something went wrong, please try again!",
          ),
      });
  }, []);

  const getFullLink = (fullUrl: string) => {
    //
  };

  const toggleOrderBy = (key: "createdAt" | "expiredAt") => {
    setQueryState((pre) => ({
      ...pre,
      orderBy: pre.orderBy === `${key}=desc` ? `${key}=asc` : `${key}=desc`,
    }));
  };

  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: "URL",
        accessor: "fullUrl",
        Cell: ({ cell: { value }, row: { original } }: any) => (
          <div className="flex items-center">
            <div className="h-10 w-10 bg-red-200 rounded-full p-2 text-center font-bold mr-3">
              <Typography className="text-red-500">
                {getShortName(original?.user?.name)}
              </Typography>
            </div>

            <div>
              <a href={value} className="text-blue-600 hover:underline">
                {value.slice(0, 50)}
              </a>
              <div>{original.shortUrl}</div>
            </div>
          </div>
        ),
      },
      {
        Header: <TableHeader>Visited</TableHeader>,
        accessor: "visits",
        Cell: ({ cell: { value } }) => (
          <div>
            {value.length}
            {/* <IconButton>
              <EllipsisHorizontalCircleIcon className="w-6 h-6" />
            </IconButton> */}
          </div>
        ),
      },
      {
        Header: (
          <TableHeader onToggle={() => toggleOrderBy("expiredAt")}>
            Expired At
          </TableHeader>
        ),
        accessor: "expiredAt",
        Cell: ({ cell: { value } }) => (
          <div>{value ? format(new Date(value), "PP") : "-"}</div>
        ),
      },
      {
        Header: (
          <TableHeader
            arrow={queryState.orderBy === "createdAt=desc" ? "up" : "down"}
            onToggle={() => toggleOrderBy("createdAt")}
          >
            Created
          </TableHeader>
        ),
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => (
          <div>{format(new Date(value), "PP")}</div>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({
          cell: {
            value,
            row: { original },
          },
        }: any) => (
          <div className="flex">
            <CopyButton text={original.shortUrl} />

            <IconButton onClick={() => handleViewDetails(original.id)}>
              <ChartBarIcon className="w-6 h-6" />
            </IconButton>

            <IconButton
              disabled={isDeleting}
              onClick={() => handleDelete(original.id)}
            >
              {isDeleting ? (
                <div className="text-grau-600">Deleting</div>
              ) : (
                <TrashIcon className="w-6 h-6 text-red-600" />
              )}
            </IconButton>
          </div>
        ),
      },
    ],
    [handleDelete],
  );

  return (
    <div>
      {loading && <LinearProgress />}
      <DataTable columns={columns} data={urls} />
    </div>
  );
};

export default LinkTable;
