import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface AlertBoxProps {
  title: string;
  desc: string;
}

const AlertBox = ({ title, desc }: AlertBoxProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p className="text-sm">{desc}</p>
      </AlertDescription>
    </Alert>
  );
};

export default AlertBox;
