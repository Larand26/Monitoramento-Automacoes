import { useEffect, useMemo, useState } from "react";

interface TableOption {
  label: string;
  camp: string;
  format?: string;
}

interface TableProps<T extends object> {
  data: T[];
  options: TableOption[];
}

const ITEMS_PER_PAGE = 8;

function formatCellValue(value: unknown, format?: string) {
  if (value instanceof Date && format === "date-time") {
    return value.toLocaleString("pt-BR");
  }

  if (typeof value === "number" && format === "time-ms") {
    const minutes = Math.floor(value / 60000);
    const seconds = Math.floor((value % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }

  if (format === "status") {
    const statusMap: Record<string, React.ReactNode> = {
      success: <span className="semantic-green">Sucesso</span>,
      error: <span className="semantic-red">Erro</span>,
      warning: <span className="semantic-yellow">Aviso</span>,
      running: <span className="semantic-blue">Em execução</span>,
    };
    return statusMap[String(value)] || String(value);
  }

  if (value === null || value === undefined) {
    return "-";
  }

  return String(value);
}

export default function Table<T extends object>({
  data,
  options,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));

  const visibleRows = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, data]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-700/70 bg-slate-800/60 shadow-[0_12px_30px_rgba(15,23,42,0.35)] backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-slate-100">
          <thead className="bg-slate-900/95 text-slate-200">
            <tr>
              {options.map((column) => (
                <th
                  key={column.camp}
                  className="sticky top-0 z-10 border-b border-slate-700/70 bg-slate-900/95 px-6 py-4 text-left text-[13px] font-semibold tracking-wide first:pl-5 last:pr-5"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/70">
            {visibleRows.map((row, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                className="transition-colors duration-150 odd:bg-slate-700/35 even:bg-slate-700/20 hover:bg-slate-600/40"
              >
                {options.map((column) => (
                  <td
                    key={`${column.camp}-${rowIndex}`}
                    className="px-6 py-3 text-[13px] font-semibold text-slate-100 first:pl-5 last:pr-5"
                  >
                    {formatCellValue(
                      row[column.camp as keyof T],
                      column.format,
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-slate-700/70 bg-slate-900/70 px-5 py-4">
        <p className="text-sm font-medium text-slate-300">
          Página {currentPage} de {totalPages}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
