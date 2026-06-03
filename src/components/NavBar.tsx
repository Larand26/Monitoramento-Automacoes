import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/sma-logo.svg";

export default function NavBar(props: { pageActive?: string }) {
  const navigate = useNavigate();
  const home = props.pageActive === "home" ? "txt-secondary" : "txt-primary";
  const linkStyle =
    "font-medium hover:txt-secondary transition-colors duration-300 cursor-pointer hover:underline";
  const dashboards =
    props.pageActive === "dashboards" ? "txt-secondary" : "txt-primary";
  const historicos =
    props.pageActive === "historicos" ? "txt-secondary" : "txt-primary";

  const windowNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="bg-card-1 w-full h-16 flex items-center p-4 justify-between">
      <Link to="/">
        <img src={logo} alt="SMA Logo" className="h-20 w-20" />
      </Link>
      <ul className="flex gap-10">
        <li>
          <button
            type="button"
            onClick={() => windowNavigate("/")}
            className={`${linkStyle} ${home}`}
          >
            Home
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => windowNavigate("/dashboards")}
            className={`${linkStyle} ${dashboards}`}
          >
            Dashboards
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => windowNavigate("/logs")}
            className={`${linkStyle} ${historicos}`}
          >
            Logs
          </button>
        </li>
      </ul>
    </nav>
  );
}
