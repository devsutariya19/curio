import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export function MdxNote({ children, title = "Note" }: Props) {
  return (
    <Alert className="bg-emerald-950 border-emerald-700 my-3">
      <Info className="h-4 w-4 text-emerald-500" />
      <AlertTitle className="text-white">{title}</AlertTitle>
      <AlertDescription className="text-sm">{children}</AlertDescription>
    </Alert>
  );
}
