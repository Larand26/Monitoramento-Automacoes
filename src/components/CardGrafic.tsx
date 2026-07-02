import { useEffect, useRef } from "react";
import Card from "./Card";
import Chart from "chart.js/auto";
import type { iLog } from "../interfaces/interfaces";

export default function CardGrafic(props: { logs?: iLog[] }) {
  const { logs } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // 1. Movemos os cálculos para FORA do useEffect.
  // Agora eles estão no escopo do componente e todos podem acessá-los.
  const successCount =
    logs?.filter((log) => log.status === "success").length || 0;
  const errorCount = logs?.filter((log) => log.status === "error").length || 0;
  const runningCount =
    logs?.filter((log) => log.status === "running").length || 0;
  const warningCount =
    logs?.filter((log) => log.status === "warning").length || 0;

  const percentSuccess = logs?.length
    ? Math.round((successCount / logs.length) * 100)
    : 0;

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // O Chart.js agora consome as variáveis que calculamos ali em cima
    chartInstanceRef.current = new Chart(canvasRef.current, {
      type: "pie",
      data: {
        labels: ["Sucesso", "Erro", "Rodando", "Aviso"],
        datasets: [
          {
            label: "Status das automações",
            data: [successCount, errorCount, runningCount, warningCount],
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [logs, successCount, errorCount, runningCount, warningCount]);

  return (
    <Card>
      <h2 className="text-xl font-semibold text-primary mb-4">
        {logs?.[0]?.jobName || "Sem nome"}
      </h2>
      <div className="flex  justify-between gap-4">
        <div>
          <p>
            <span className="text-sm txt-secondary">Total de execuções: </span>
            <span className="text-sm">{logs?.length || 0}</span>
          </p>

          <p>
            <span className="text-sm txt-secondary">
              Porcentagem de acerto:{" "}
            </span>
            <span className="text-sm">{percentSuccess}%</span>
          </p>
        </div>
        <div>
          <canvas className="max-w-3xs max-h-50" ref={canvasRef} />
        </div>
      </div>
    </Card>
  );
}
