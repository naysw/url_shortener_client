import { ChartBarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import React from "react";
import { Column } from "react-table";
import { toast } from "react-toastify";
import { useDeleteLinkMutation } from "../../hooks/useDeleteLinkMutation";
import DataTable from "../../nsw/components/DataTable";
import IconButton from "../../nsw/ui/components/IconButton";
import Typography from "../../nsw/ui/components/Typography";
import { UrlModel } from "../../types";
import { getShortName } from "../../utils/string";
import CopyButton from "../CopyButton";
import TableHeader from "../TableHeader";
import { useUI } from "../UIContext/UIContext";

interface Props {
  urls: UrlModel[];
  setQuery: (value: any) => void;
}

const LinkTable = ({ urls, setQuery }: Props) => {
  const { mutate, isLoading: isDeleting } = useDeleteLinkMutation();
  const { setDialog } = useUI();

  const handleViewDetails = React.useCallback((urlId: string) => {
    setDialog({ name: "LINK_STATISTICS_DIALOG", data: urlId });
  }, []);

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

  const toggleVisited = () => {
    console.log("first");
    // setQuery((pre: any) => ({ ...pre, visited: "asc" }));
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
        Header: <TableHeader>Expired At</TableHeader>,
        accessor: "expiredAt",
        Cell: ({ cell: { value } }) => (
          <div>{value ? format(new Date(value), "PP") : "-"}</div>
        ),
      },
      {
        Header: <TableHeader>Created</TableHeader>,
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

  return <DataTable columns={columns} data={urls} />;
};

export default LinkTable;
