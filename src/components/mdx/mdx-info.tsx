import React, { ReactNode } from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function MdxInfo({ children }: { children: ReactNode }) {
  const childrenArray = React.Children.toArray(children);

  const firstChild = childrenArray[0];
  const rest = childrenArray.slice(1);

  const title = React.isValidElement(firstChild) ? firstChild : null;
  const description = title ? rest : childrenArray;

  return (
    <Alert className="text-white bg-gray-700">
      <InfoIcon className="text-white" />
      {title && <AlertTitle className="text-white [&>p]:mt-0 [&>p]:mb-0">{title}</AlertTitle>}
      <AlertDescription className="text-white">{description}</AlertDescription>
    </Alert>
  );
}
