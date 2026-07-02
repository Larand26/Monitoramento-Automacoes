import type { iLog } from "../interfaces/interfaces";

interface DetailsLogProps {
  log: iLog | null;
  onClose?: () => void;
  isOpen?: boolean;
}

export default function DetailsLog({ log, onClose, isOpen }: DetailsLogProps) {
  // Ajustado para aceitar undefined/null com segurança
  const getStatusStyles = (status?: iLog["status"]) => {
    if (!status)
      return {
        text: "txt-secondary",
        border: "border-card",
        bg: "bg-slate-800/30",
      };

    switch (status) {
      case "success":
        return {
          text: "semantic-green",
          border: "border-semantic-green",
          bg: "bg-[rgba(29,172,82,0.1)]",
        };
      case "warning":
        return {
          text: "semantic-yellow",
          border: "border-semantic-yellow",
          bg: "bg-[rgba(205,132,9,0.1)]",
        };
      case "error":
        return {
          text: "semantic-red",
          border: "border-semantic-red",
          bg: "bg-[rgba(194,49,49,0.1)]",
        };
      case "running":
        return {
          text: "semantic-blue",
          border: "border-semantic-blue",
          bg: "bg-[rgba(44,106,209,0.1)]",
        };
    }
  };

  const statusStyle = getStatusStyles(log?.status);

  const formatDate = (date?: Date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("pt-BR");
  };

  // Se não estiver aberto e não houver log antigo sendo animado, remove completamente do DOM
  if (!isOpen && !log) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className={`bg-card-1 border-card relative z-10 flex h-full w-1/2 flex-col border-l p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="border-card mb-6 flex items-start justify-between border-b pb-4">
          <div>
            <div className="flex items-center gap-3">
              {log?.status && (
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                >
                  {log.status}
                </span>
              )}
              <span className="txt-secondary font-mono text-sm">
                ID: #{log?.runId ?? "-"}
              </span>
            </div>
            <h2 className="txt-primary mt-2 text-xl font-bold tracking-tight">
              {log?.jobName ?? "Nenhum log selecionado"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="txt-secondary hover:bg-slate-800/50 rounded-lg p-1.5 transition-colors cursor-pointer"
            aria-label="Fechar painel"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Grid de Metadados */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="border-card/40 rounded-lg border bg-slate-900/30 p-3">
            <span className="txt-secondary text-xs font-medium uppercase tracking-wider">
              Ambiente
            </span>
            <p className="txt-primary mt-1 text-sm font-semibold">
              {log?.environment ?? "-"}
            </p>
          </div>
          <div className="border-card/40 rounded-lg border bg-slate-900/30 p-3">
            <span className="txt-secondary text-xs font-medium uppercase tracking-wider">
              Duração
            </span>
            <p className="txt-primary mt-1 text-sm font-semibold">
              {log?.durationMs !== undefined
                ? `${(log.durationMs / 1000).toFixed(2)}s`
                : "-"}
            </p>
          </div>
          <div className="border-card/40 rounded-lg border bg-slate-900/30 p-3">
            <span className="txt-secondary text-xs font-medium uppercase tracking-wider">
              Iniciado em
            </span>
            <p className="txt-primary mt-1 font-mono text-xs">
              {formatDate(log?.startedAt)}
            </p>
          </div>
          <div className="border-card/40 rounded-lg border bg-slate-900/30 p-3">
            <span className="txt-secondary text-xs font-medium uppercase tracking-wider">
              Finalizado em
            </span>
            <p className="txt-primary mt-1 font-mono text-xs">
              {formatDate(log?.finishedAt)}
            </p>
          </div>
        </div>

        {/* Mensagem do Sistema */}
        {log?.message && (
          <div
            className={`mb-6 rounded-lg border p-4 ${statusStyle.bg} ${statusStyle.border}`}
          >
            <span
              className={`text-xs font-bold uppercase tracking-wider ${statusStyle.text}`}
            >
              Mensagem do Sistema
            </span>
            <p className="txt-primary mt-1.5 break-words font-mono text-sm leading-relaxed">
              {log.message}
            </p>
          </div>
        )}

        {/* Container JSON */}
        <div className="flex min-h-0 flex-1 flex-col">
          <span className="txt-secondary mb-2 text-xs font-bold uppercase tracking-wider">
            Detalhes do Payload (JSON)
          </span>

          {log?.details && Object.keys(log.details).length > 0 ? (
            <div className="border-card flex-1 overflow-auto rounded-lg bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-300">
              <pre className="whitespace-pre-wrap break-all selection:bg-indigo-500/30">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="border-card flex-1 flex items-center justify-center rounded-lg border border-dashed bg-slate-950/20 p-4">
              <span className="txt-secondary text-sm italic">
                Nenhum detalhe adicional disponível para este log.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
