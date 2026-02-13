import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React, { useState } from "react";

const Table = ({ data, columns }) => {
  const [sorting, setSorting] = React.useState([]);
  const [expanded, setExpanded] = useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      expanded,
    },
    onExpandedChange: setExpanded,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="relative overflow-x-auto shadow-xs rounded-base ">
      <div className="flex justify-between my-2">
        <label className="sr-only">Underline select</label>
        <form className="w-32">
          <label className="sr-only">Select an option</label>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm leading-4 rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <option value={pageSize} key={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </form>
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          type="text"
          className="py-1 px-2 border border-default-medium text-heading text-sm"
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-slate-200 border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  scope="col"
                  className="px-6 py-3 font-medium"
                  key={header.id}
                >
                  <div
                    className="flex items-center gap-3"
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-one flex items-center"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    <ArrowUpDown className="p-1 text-gray-500" />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr className="bg-neutral-primary-soft hover:bg-neutral-secondary-medium border-b border-default">
                {row.getVisibleCells().map((cell) => (
                  <td className="px-6 py-4" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>

              {row.getIsExpanded() && (
                <tr className="bg-gray-50">
                  <td colSpan={row.getVisibleCells().length} className="p-4">
                    <div className="space-y-2">
                      <p>
                        <strong>Created On:</strong> {row.original.createddate}
                      </p>
                      <p>
                        <strong>Updated On:</strong> {row.original.updateddate}
                      </p>
                      <p>
                        <strong>Created By:</strong> {row.original.createdby}
                      </p>
                      <p>
                        <strong>Updated By:</strong> {row.original.updatedby}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="flex -space-x-px text-sm mt-3">
          <li>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-s-base text-sm px-3 h-9 focus:outline-none"
            >
              <span className="text-gray-600">Previous</span>
            </button>
          </li>

          {[...Array(table.getPageCount())].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => table.setPageIndex(index)}
                aria-current={
                  table.getState().pagination.pageIndex === index
                    ? "page"
                    : undefined
                }
                className={`flex items-center justify-center box-border border border-default-medium font-medium text-sm w-9 h-9 focus:outline-none
            ${
              table.getState().pagination.pageIndex === index
                ? "text-fg-brand bg-neutral-tertiary-medium"
                : "text-body bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium hover:text-heading"
            }`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-s-base text-sm px-3 h-9 focus:outline-none"
            >
              <span className="text-gray-600">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Table;
