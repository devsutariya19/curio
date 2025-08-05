import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Leaf, Star, Book } from "lucide-react";

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

  const isExternal = href && (
    /^https?:\/\//.test(href) || /^www\./.test(href)
  );

  const CardInner = (
    <Card className="transition-shadow hover:shadow-md my-5 bg-gray-800">
      <CardHeader className="flex items-center gap-3">
        {Icon}
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>

          {href && (
            <CardDescription className="text-xs text-muted-foreground break-all">
              {isExternal ? (
                <>{href}</>
              ) : (
                fullHref
              )}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{children}</CardContent>
    </Card>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {CardInner}
      </a>
    );
  }

  return fullHref ? (
    <Link href={fullHref}>
      {CardInner}
    </Link>
  ) : (
    CardInner
  );
}
