import NavBar from "../../components/NavBar";
import Table from "../../components/Table";

import { logs } from "../../data/logs";
import logsOptions from "../../assets/options/logs.options.json";

export default function Logs() {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <NavBar pageActive="home" />
      <div className="w-[90%] h-[calc(100vh-4rem)] p-4 m-auto">
        <Table data={logs} options={logsOptions} />
      </div>
    </div>
  );
}
