import { ChartBarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import React from "react";
import { Column } from "react-table";
import { toast } from "react-toastify";
import { useDeleteLinkMutation } from "../../hooks/useDeleteLinkMutation";
import DataTable from "../../nsw/components/DataTable";
import IconButton from "../../nsw/ui/components/IconButton";
import { UrlModel } from "../../types";
import CopyButton from "../CopyButton";
import { useUI } from "../UIContext/UIContext";

interface Props {
  urls: UrlModel[];
}

const LinkTable = ({ urls }: Props) => {
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

  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: "URL",
        accessor: "fullUrl",
        Cell: ({ cell: { value }, row: { original } }: any) => (
          <div>
            <a href={value} className="text-blue-600 hover:underline">
              {value.slice(0, 50)}
            </a>
            <div>{original.shortUrl}</div>
          </div>
        ),
      },
      {
        Header: "Visited",
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
        Header: "Expired At",
        accessor: "expiredAt",
        Cell: ({ cell: { value } }) => (
          <div>{value ? format(new Date(value), "PP") : "-"}</div>
        ),
      },
      {
        Header: "Created",
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
