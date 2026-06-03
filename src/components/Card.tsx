export default function Card(props: { children?: React.ReactNode }) {
  return (
    <div className="bg-card-1 border-card border w-full h-64 rounded-lg shadow-md p-4">
      {props.children}
    </div>
  );
}
