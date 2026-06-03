export default function Card(props: {
  children?: React.ReactNode;
  className?: string;
  noBg?: boolean;
}) {
  const baseStyle = `${props.noBg ? "" : "bg-card-1 border-card border"} w-full rounded-lg shadow-md p-4`;
  return (
    <div className={`${baseStyle} ${props.className || ""}`}>
      {props.children}
    </div>
  );
}
