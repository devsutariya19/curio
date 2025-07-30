import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, TriangleAlert } from "lucide-react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export function MdxWarning({ children, title = "Warning" }: Props) {
  return (
    <Alert variant="destructive" className="my-3">
      <TriangleAlert className="h-4 w-4"/>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="text-sm">{children}</AlertDescription>
    </Alert>
  );
}
