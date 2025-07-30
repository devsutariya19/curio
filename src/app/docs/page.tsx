import ResponsiveBreadcrumbs from '@/components/responsive-breadcrumbs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Book, Code, Rocket, Search } from 'lucide-react';
import Link from 'next/link';

export default function Docs() {
  const mainSections = [
    {
      title: "Getting Started",
      description: "Begin your journey and learn the basics of setting up your project.",
      icon: <Book className="h-8 w-8 text-emerald-400" />,
      href: "/docs/getting-started",
    },
    {
      title: "API Reference",
      description: "Explore the complete API, including all available endpoints and methods.",
      icon: <Code className="h-8 w-8 text-emerald-400" />,
      href: "/docs",
    },
    {
      title: "Deployment",
      description: "Follow our guides to deploy your project to production seamlessly.",
      icon: <Rocket className="h-8 w-8 text-emerald-400" />,
      href: "/docs",
    },
  ];

  return (
    <>
      <div className='lg:hidden'>
        <ResponsiveBreadcrumbs slug={[]} />
      </div>
      <div className="relative flex min-h-screen flex-col items-center p-4 sm:p-8">
        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Welcome to the <span className="text-emerald-400">Docs</span> 🩺
          </h1>
          <p className="mt-4 max-w-2xl lg:text-lg text-gray-400">
            Find the guides, tutorials, and references you need to build with our platform. Start by searching or exploring one of the sections below.
          </p>

          <div className="relative mt-8.5 w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search documentation..."
              className="w-full rounded-lg  border-gray-700 pl-10 pr-4 py-6 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="mt-10 grid w-full grid-cols-1 gap-8 md:max-w-lg lg:max-w-none lg:grid-cols-3">
            {mainSections.map((section) => (
              <Link href={'/docs'} key={section.title} className="group">
                <Card className="h-full bg-gray-800/60 border-gray-700 rounded-xl shadow-lg hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="flex flex-col items-center text-center p-6">
                    <div className="mb-4">{section.icon}</div>
                    <CardTitle className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {section.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 pt-2">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
