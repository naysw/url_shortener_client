import React, { ReactElement } from "react";
import { Column, useRowSelect, useTable } from "react-table";
import TableCheckbox from "./TableCheckbox";

interface Props {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  showCheckbox?: boolean;
}

const DataTable: React.FC<Props> = ({
  data,
  columns,
  isLoading,
  showCheckbox = false,
}): ReactElement => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useRowSelect, ({ visibleColumns }) => {
      if (showCheckbox) {
        visibleColumns.push((columns) => [
          {
            id: "selection",
            maxWidth: 45,
            width: 45,
            Header: ({ getToggleAllRowsSelectedProps }: any) => (
              <TableCheckbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }: any) => (
              <TableCheckbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ]);
      }
    });

  return (
    <table
      {...getTableProps()}
      className="min-w-max w-full table-auto shadow-sm rounded"
    >
      <thead>
        {headerGroups.map((headerGroup) => {
          const { key, ...otherHeader } = headerGroup.getHeaderGroupProps();

          return (
            <tr
              key={key}
              {...otherHeader}
              className="bg-slate-100 dark:bg-zinc-800 text-gray-600 dark:text-white uppercase leading-normal"
            >
              {headerGroup.headers.map((column, index) => {
                const { key, ...restColumn } = column.getHeaderProps();
                return (
                  <th
                    key={key}
                    {...restColumn}
                    className={`py-3 px-6 text-left ${
                      showCheckbox && index === 0 && "w-10"
                    } `}
                  >
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>

      <tbody {...getTableBodyProps()} className="text-gray-600 font-light">
        {rows.length ? (
          rows.map((row, index) => {
            prepareRow(row);
            const { key, ...otherRow } = row.getRowProps();

            return (
              <tr
                key={key}
                {...otherRow}
                className="border-b border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-transparent"
              >
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();

                  return (
                    <td
                      key={key}
                      {...restCellProps}
                      className={`py-3 px-6 text-left dark:text-white whitespace-nowrap ${
                        showCheckbox && index === 0 && "w-10"
                      }`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <tr className="border-gray-200">
            <td className="py-3 px-6 text-left whitespace-nowrap">
              No data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

DataTable.displayName = "DataTable";

export default DataTable;
