import { cn } from '@/lib/utils'

interface DataTableProps {
  headers: string[]
  rows: string[][]
  className?: string
}

export function DataTable({ headers, rows, className }: DataTableProps) {
  return (
    <div className={cn('overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700', className)}>
      <table className="w-full text-sm md:text-base">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-gray-600 dark:text-gray-400"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
