import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Dashboards from "./pages/dashboards/Dashboards";
import Logs from "./pages/logs/Logs";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboards" element={<Dashboards />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </Router>
  );
}
