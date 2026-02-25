import React from "react";
export interface ColumnType<T> {
  title: string;
  key: keyof T;
  alignMent?: "left" | "center" | "right";
  render?: (value: T[keyof T], record: T) => React.ReactNode;
}
export interface TableProps<T> {
  columns: ColumnType<T>[];
  dataSource: T[];
}

const Table = <T,>({ columns, dataSource }: TableProps<T>) => {
  return (
    <>
      <div className="overflow-auto h-[calc(100vh-285px)] border border-gray-200 rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="text-gray-400 sticky top-0 bg-white z-10">
            <tr>
              {columns.map((heading, index) => (
                <th
                  key={index}
                  className="px-4 py-4 text-left text-sm font-medium text-gray-500 capitalize border-b border-gray-200"
                >
                  {heading.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((data, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 border-dashed hover:bg-gray-50 "
              >
                {columns?.map((header, key) => {
                  if (!header || !data) return null;

                  const value = data[header.key];
                  const hasRender = typeof header.render === "function";

                  return (
                    <td key={key} className={`px-4 py-4 text-sm text-gray-700`}>
                      {hasRender
                        ? header.render?.(value as T[keyof T], data as T)
                        : value !== null && value !== undefined && value !== ""
                        ? String(value)
                        : "N/A"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
