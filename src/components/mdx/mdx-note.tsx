import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export function MdxNote({ children, title = "Note" }: Props) {
  return (
    <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
      <Info className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-700 dark:text-blue-300">{title}</AlertTitle>
      <AlertDescription className="text-sm">{children}</AlertDescription>
    </Alert>
  );
}
