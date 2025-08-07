import { cn } from "@/lib/utils";

type ColumnsProps = {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
};

export function MdxColumns({ children, cols = 2, className }: ColumnsProps) {
  const gridCols = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[cols];

  return (
    <div
      className={cn("grid grid-cols-1 gap-3", gridCols, "auto-rows-auto", className)}
    >
      {children}
    </div>
  );
}