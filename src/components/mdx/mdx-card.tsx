import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Leaf, Star, Book } from "lucide-react";
import { DOCS_FILE_PATH, DOCS_FOLDER } from "@/lib/constants";

const iconMap = {
  leaf: <Leaf className="w-5 h-5 text-green-500" />,
  star: <Star className="w-5 h-5 text-yellow-500" />,
  book: <Book className="w-5 h-5 text-blue-500" />,
};

type Props = {
  title: string;
  icon?: keyof typeof iconMap;
  href?: string;
  children?: React.ReactNode;
};

export function MdxCard({ title, icon, href, children }: Props) {
  const Icon = icon ? iconMap[icon] : null;
  const normalizedHref = href ? href.replace(/^\/+/, '') : '';
  const fullHref = `/docs/${normalizedHref}`;

  const CardInner = (
    <Card className="transition-shadow hover:shadow-md my-5 bg-gray-800">
      <CardHeader className="flex items-center gap-3">
        {Icon}
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {fullHref && (
            <CardDescription className="text-xs text-muted-foreground break-all">
              {fullHref}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{children}</CardContent>
    </Card>
  );

  return fullHref ? (
    <Link href={fullHref} target="_blank" rel="noopener noreferrer">
      {CardInner}
    </Link>
  ) : (
    CardInner
  );
}