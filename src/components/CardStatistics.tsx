import Card from "./Card";

export default function CardStatistics(props: {
  title: string;
  value: string;
  error?: boolean;
  success?: boolean;
}) {
  const errorTextStyle = props.error ? "semantic-red" : "";
  const successTextStyle = props.success ? "semantic-green" : "";
  const errorCardStyle = props.error
    ? "border-semantic-red bg-red-900/20 border"
    : "";
  const successCardStyle = props.success
    ? "border-semantic-green bg-green-900/20 border"
    : "";
  return (
    <Card
      noBg={props.error || props.success ? true : false}
      className={`flex flex-col items-start gap-2 ${errorCardStyle || successCardStyle}`}
    >
      <h2 className={`text-primary ${errorTextStyle || successTextStyle}`}>
        {props.title}
      </h2>
      <p className={`text-4xl font-bold ${errorTextStyle || successTextStyle}`}>
        {props.value}
      </p>
    </Card>
  );
}
