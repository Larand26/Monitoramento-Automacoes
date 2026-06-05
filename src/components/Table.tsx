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
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {options.map((column) => (
              <th key={column.camp} className="p-2 text-left border-b">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {options.map((column) => (
                <td key={`${column.camp}-${rowIndex}`} className="p-2 border-b">
                  {formatCellValue(row[column.camp], column.format)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
