import NavBar from "../../components/NavBar";
import CardStatistics from "../../components/CardStatistics";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <NavBar pageActive="home" />
      <div className="w-[90%] h-[calc(100vh-4rem)] p-4 margin-auto">
        <h1 className="text-4xl font-bold text-primary">Home</h1>
        {/* statistics */}
        <div className="w-full h-full flex items-center justify-between gap-4 p-4">
          <CardStatistics title="Total de automações" value="10" />
          <CardStatistics title="Automações rodando" value="1" />
          <CardStatistics title="Erros" value="1" error={true} />
          <CardStatistics title="Sucessos" value="3" success={true} />
        </div>
      </div>
    </div>
  );
}
