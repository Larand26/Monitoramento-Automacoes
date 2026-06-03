import Card from "./Card";
import Flag from "./Flag";
import type { iLog } from "../interfaces/interfaces";

export default function CardAutomation(props: { log?: iLog }) {
  const { log } = props;

  return (
    <Card className="relative">
      <Flag variant={log?.status || "running"} />

      <h2 className="text-2xl font-bold">{log?.jobName}</h2>
      <div className="flex gap-4">
        <p>
          <span className="text-sm txt-secondary">Ultima execução: </span>
          <span className="text-sm">
            {log?.finishedAt
              ? (log.finishedAt.getTime() - log.startedAt.getTime()) / 1000
              : 0}{" "}
            segundos
          </span>
        </p>
        <p>
          <span className="text-sm txt-secondary">Duração: </span>
          <span className="text-sm">{log?.durationMs ?? 0}ms</span>
        </p>
      </div>
      <hr className="border-card my-4" />
      <div>
        <p>
          <span className="text-sm txt-secondary">Últimos detalhes </span>
          <span className="text-sm">
            {log?.message ?? "Nenhum detalhe disponível"}
          </span>
        </p>
      </div>
    </Card>
  );
}
