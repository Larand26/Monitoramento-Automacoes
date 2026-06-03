import Card from "./Card";
import Flag from "./Flag";

export default function CardAutomation() {
  return (
    <Card className="relative">
      <Flag variant="success" />

      <h2 className="text-2xl font-bold">Automação 1</h2>
      <div className="flex gap-4">
        <p>
          <span className="text-sm txt-secondary">Ultima execução: </span>
          <span className="text-sm">10 minutos</span>
        </p>
        <p>
          <span className="text-sm txt-secondary">Duração: </span>
          <span className="text-sm">135ms</span>
        </p>
      </div>
      <hr className="border-card my-4" />
      <div>
        <p>
          <span className="text-sm txt-secondary">Últimos detalhes </span>
          <span className="text-sm">Detalhes da última execução...</span>
        </p>
      </div>
    </Card>
  );
}
