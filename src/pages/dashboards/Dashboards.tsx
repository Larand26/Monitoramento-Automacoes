import NavBar from "../../components/NavBar";
import CardGrafic from "../../components/CardGrafic";

import type { iLog } from "../../interfaces/interfaces";
import { logs } from "../../data/logs";

export default function Dashboards() {
  const groupedLogsMap = new Map<string, iLog[]>();

  logs.forEach((log) => {
    if (!groupedLogsMap.has(log.jobName)) {
      groupedLogsMap.set(log.jobName, []);
    }
    groupedLogsMap.get(log.jobName)!.push(log);
  });

  const logsByAutomation: iLog[][] = Array.from(groupedLogsMap.values());

  console.log("logsByAutomation", logsByAutomation);

  return (
    <div className="w-full h-screen overflow-y-auto">
      <NavBar pageActive="dashboards" />
      <div className="w-[90%] min-h-[calc(100vh-4rem)] p-4 m-auto">
        <h1 className="text-4xl font-bold text-primary mb-6">Dashboards</h1>

        {/* Adicionado 'flex-wrap' e 'gap-6' para evitar que os gráficos esmaguem uns aos outros */}
        <div className="w-full grid grid-cols-2 gap-6 p-4">
          {logsByAutomation.map((logGroup) => (
            <CardGrafic
              key={logGroup[0]?.jobName || Math.random().toString()}
              logs={logGroup}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
