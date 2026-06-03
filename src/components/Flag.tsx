import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faTriangleExclamation,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const options = {
  success: {
    text: "Sucesso",
    style: "bg-green-900/20 semantic-green border border-semantic-green",
    icon: faCircleCheck,
  },
  error: {
    text: "Erro",
    style: "bg-red-900/20 semantic-red border border-semantic-red",
    icon: faCircleXmark,
  },
  warning: {
    text: "Aviso",
    style: "bg-yellow-900/20 semantic-yellow border border-semantic-yellow",
    icon: faTriangleExclamation,
  },
  running: {
    text: "Rodando",
    style: "bg-blue-900/20 semantic-blue border border-semantic-blue",
    icon: faArrowRotateRight,
  },
};

export default function Flag(props: {
  variant: "success" | "error" | "warning" | "running";
}) {
  const span = options[props.variant]?.text || "";
  const style = options[props.variant]?.style || "";
  const icon = options[props.variant]?.icon;
  return (
    <div
      className={`flex items-center justify-between ${style} absolute top-4 right-4 px-2 py-1 rounded-full text-sm font-bold min-w-30`}
    >
      <span>{span}</span>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}
