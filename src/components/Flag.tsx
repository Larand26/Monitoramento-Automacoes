const options = {
  success: {
    text: "Sucesso",
    style: "bg-green-900/20 semantic-green border border-semantic-green",
  },
  error: {
    text: "Erro",
    style: "bg-red-900/20 semantic-red border border-semantic-red",
  },
  warning: {
    text: "Aviso",
    style: "bg-yellow-900/20 semantic-yellow border border-semantic-yellow",
  },
  running: {
    text: "Rodando",
    style: "bg-blue-900/20 semantic-blue border border-semantic-blue",
  },
};

export default function Flag(props: {
  variant: "success" | "error" | "warning" | "running";
}) {
  const span = options[props.variant]?.text || "";
  const style = options[props.variant]?.style || "";
  return (
    <div
      className={`flex items-center justify-between ${style} absolute top-4 right-4 px-2 py-1 rounded-full text-sm font-bold min-w-30`}
    >
      <span>{span}</span>
      <i></i>
    </div>
  );
}
