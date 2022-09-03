import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import React from "react";
import { Column } from "react-table";
import { useDeleteLinkMutation } from "../../hooks/useDeleteLinkMutation";
import DataTable from "../../nsw/components/DataTable";
import IconButton from "../../nsw/ui/components/IconButton";
import { UrlModel } from "../../types";

interface Props {
  urls: UrlModel[];
}

const LinkTable = ({ urls }: Props) => {
  const { mutate, isLoading: isDeleting } = useDeleteLinkMutation();

  const handleDelete = React.useCallback((urlId: string) => {
    mutate(urlId);
  }, []);

  const getFullLink = (fullUrl: string) => {
    //
  };

  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: "Original url",
        accessor: "fullUrl",
        Cell: ({ cell: { value } }) => (
          <div>
            <a href={value} className="text-blue-600 hover:underline">
              {value.slice(0, 50)}
            </a>
          </div>
        ),
      },
      {
        Header: "Short Link",
        accessor: "link",
        Cell: ({ cell: { value } }) => <div>{value}</div>,
      },
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => (
          <div>{format(new Date(value), "PPpp")}</div>
        ),
      },
      {
        Header: "Visited",
        accessor: "visits",
        Cell: ({ cell: { value } }) => (
          <div>
            {value.length}
            <IconButton>
              <EllipsisHorizontalCircleIcon className="w-6 h-6" />
            </IconButton>
          </div>
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
          <div>
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
