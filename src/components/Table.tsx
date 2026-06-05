type TableRow = Record<string, unknown>;

interface TableOption {
  label: string;
  camp: string;
  format?: string;
}

interface TableProps {
  data: TableRow[];
  options: TableOption[];
}

function formatCellValue(value: unknown, format?: string) {
  if (value instanceof Date && format === "date-time") {
    return value.toLocaleString("pt-BR");
  }

  if (typeof value === "number" && format === "time-ms") {
    const minutes = Math.floor(value / 60000);
    const seconds = Math.floor((value % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }

  if (value === null || value === undefined) {
    return "-";
  }

  return String(value);
}

export default function Table({ data, options }: TableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-700/70 bg-slate-800/60 shadow-[0_12px_30px_rgba(15,23,42,0.35)] backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-slate-100">
          <thead className="bg-slate-900/80 text-slate-200">
            <tr>
              {options.map((column) => (
                <th
                  key={column.camp}
                  className="px-6 py-4 text-left text-[13px] font-semibold tracking-wide border-b border-slate-700/70 first:pl-5 last:pr-5"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/70">
            {data.map((row, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                className="transition-colors duration-150 odd:bg-slate-700/35 even:bg-slate-700/20 hover:bg-slate-600/40"
              >
                {options.map((column) => (
                  <td
                    key={`${column.camp}-${rowIndex}`}
                    className="px-6 py-4 text-[13px] font-semibold text-slate-100 first:pl-5 last:pr-5"
                  >
                    {formatCellValue(row[column.camp], column.format)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
