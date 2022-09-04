import { format } from "date-fns";
import React from "react";
import { Column } from "react-table";
import DataTable from "../../nsw/components/DataTable";
import { Visit } from "../../types";

interface Props {
  visits: Visit[];
}

const VisitTable = ({ visits }: Props) => {
  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: "IP",
        accessor: "ip",
        Cell: ({ cell: { value } }: any) => <div>{value}</div>,
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ cell: { value } }: any) => (
          <div>{format(new Date(value), "PPpp")}</div>
        ),
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={visits} />;
};

export default VisitTable;
