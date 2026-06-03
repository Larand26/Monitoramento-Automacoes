import { useState } from "react";

import NavBar from "../../components/NavBar";
import CardStatistics from "../../components/CardStatistics";
import CardAutomation from "../../components/CardAutomation";

import type { iLog } from "../../interfaces/interfaces";
import { logs } from "../../data/logs";

export default function Home() {
  const [logsState, setLogsState] = useState(logs);

  const totalAutomations = logsState.length;
  const automationsRunning = logsState.filter(
    (log) => log.status === "running",
  ).length;
  const automationsErrors = logsState.filter(
    (log) => log.status === "error",
  ).length;
  const automationsSuccess = logsState.filter(
    (log) => log.status === "success",
  ).length;

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <NavBar pageActive="home" />
      <div className="w-[90%] h-[calc(100vh-4rem)] p-4 m-auto">
        <h1 className="text-4xl font-bold text-primary">Home</h1>
        {/* statistics */}
        <div className="w-full  flex items-center justify-between gap-4 p-4">
          <CardStatistics
            title="Total de automações"
            value={totalAutomations}
          />
          <CardStatistics
            title="Automações rodando"
            value={automationsRunning}
          />
          <CardStatistics
            title="Erros"
            value={automationsErrors}
            error={true}
          />
          <CardStatistics
            title="Sucessos"
            value={automationsSuccess}
            success={true}
          />
        </div>
        {/* Automations */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {logsState.map((log) => (
            <CardAutomation key={log.runId} log={log as iLog} />
          ))}
        </div>
      </div>
    </div>
  );
}
