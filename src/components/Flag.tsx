export default function Flag(props: { variant: "success" | "error" }) {
  const span = props.variant === "success" ? "Sucesso" : "Erro";
  let style = "";
  style =
    props.variant === "success"
      ? "bg-green-900/20 semantic-green border border-semantic-green"
      : "";
  style =
    props.variant === "error"
      ? "bg-red-900/20 semantic-red border border-semantic-red"
      : style;
  return (
    <div
      className={`flex items-certer justify-between ${style} absolute top-4 right-4 px-2 py-1 rounded-full text-sm font-bold min-w-30`}
    >
      <span>{span}</span>
      <i></i>
    </div>
  );
}
