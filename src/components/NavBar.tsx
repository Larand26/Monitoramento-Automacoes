import logo from "../assets/imgs/sma-logo.svg";

export default function NavBar(props: { pageActive?: string }) {
  const home = props.pageActive === "home" ? "txt-secondary" : "txt-primary";
  console.log(props.pageActive);
  const linkStyle =
    "font-medium hover:txt-secondary transition-colors duration-300 cursor-pointer hover:underline";
  const dashboards =
    props.pageActive === "dashboards" ? "txt-secondary" : "txt-primary";
  const historicos =
    props.pageActive === "historicos" ? "txt-secondary" : "txt-primary";
  return (
    <nav className="bg-card-1 w-full h-16 flex items-center p-4 justify-between">
      <a href="/">
        <img src={logo} alt="SMA Logo" className="h-20 w-20" />
      </a>
      <ul className="flex gap-10">
        <li>
          <a className={`${linkStyle} ${home}`}>Home</a>
        </li>
        <li>
          <a className={`${linkStyle} ${dashboards}`}>Dashboards</a>
        </li>
        <li>
          <a className={`${linkStyle} ${historicos}`}>Historicos</a>
        </li>
      </ul>
    </nav>
  );
}
