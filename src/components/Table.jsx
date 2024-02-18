/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
function Table({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div>
      <input
        className='border-2 border-gray-500 w-full rounded-sm p-1 mb-2'
        placeholder='Filter...'
        type='text'
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table>
        <thead className='bg-zinc-800 text-white font-bold text-xs uppercase border-1 border-gray-500 p-2'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: '⬆️', desc: '⬇️' }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className='border-1 border-gray-500 p-2 text-xs'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className='bg-zinc-800 text-white font-bold text-xs uppercase border-1 border-gray-500 p-2'>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <td key={footer.id}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className='flex items-center justify-center gap-x-1 mt-10'>
        <button
          className='bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-1 px-2 rounded-xs'
          onClick={() => table.setPageIndex(0)}
        >
          Inicio
        </button>
        <button
          className='bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-1 px-2 rounded-xs'
          onClick={() => table.previousPage()}
        >
          Anterior
        </button>
        <button
          className='bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-1 px-2 rounded-xs'
          onClick={() => table.nextPage()}
        >
          Siguiente
        </button>
        <button
          className='bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-1 px-2 rounded-xs'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Fin
        </button>
      </div>
    </div>
  );
}

export default Table;
