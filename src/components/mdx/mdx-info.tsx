import React, { ReactNode } from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { Info } from "lucide-react";

export function MdxInfo({ children }: { children: ReactNode }) {
  const childrenArray = React.Children.toArray(children);

  const firstChild = childrenArray[0];
  const rest = childrenArray.slice(1);

  const title = React.isValidElement(firstChild) ? firstChild : null;
  const description = title ? rest : childrenArray;

  return (
    <Alert className="text-white bg-gray-700 my-3">
      <Info className="h-5 w-5 text-white" />
      {title && <AlertTitle className="text-white [&>p]:mt-0 [&>p]:mb-0">{title}</AlertTitle>}
      <AlertDescription className="text-gray-300 text-sm">{description}</AlertDescription>
    </Alert>
  );
}
