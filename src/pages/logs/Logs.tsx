import { useState } from "react";

import NavBar from "../../components/NavBar";
import Table from "../../components/Table";
import DetailsLog from "../../components/DetailsLog";

import { logs } from "../../data/logs";
import logsOptions from "../../assets/options/logs.options.json";
import type { iLog } from "../../interfaces/interfaces";

export default function Logs() {
  const [selectedLog, setSelectedLog] = useState<iLog | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDetailsLog = (log: iLog) => {
    setSelectedLog(log);
    setIsOpen(true);
  };

  const closeDetailsLog = () => {
    setIsOpen(false);
    setSelectedLog(null);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <NavBar pageActive="home" />
      <div className="w-[90%] h-[calc(100vh-4rem)] p-4 m-auto">
        <Table
          data={logs}
          options={logsOptions}
          openDetailsLog={openDetailsLog}
        />
      </div>
      <DetailsLog log={selectedLog} onClose={closeDetailsLog} isOpen={isOpen} />
    </div>
  );
}
