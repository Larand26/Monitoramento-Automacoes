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

function formatCellValue(value: unknown) {
  if (value instanceof Date) {
    return value.toLocaleString("pt-BR");
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
                  {formatCellValue(row[column.camp])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
