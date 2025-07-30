import FakeCodeEditor from "@/components/code-editor";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Zap, ArrowRight, Book, Github, Rocket } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {data, error} = await supabase.auth.getUser();
  const isAuthenticated = data.user !== null;
  if (error || !isAuthenticated) {
    redirect('/login');
  }

  const features = [
    {
      title: "Built for Speed and Simplicity",
      description: "DocuFlow uses a folder-based system to turn your markdown files into beautifully rendered documentation pages automatically. No complex setup, just create files and see them live.",
      icon: <Book className="h-8 w-8 mb-4 text-emerald-400" />,
      visual: <FakeCodeEditor language="File Tree" content={`/docs\n  ├── introduction.mdx\n  ├── getting-started.mdx\n  └── /api\n      └── reference.mdx`} />,
    },
    {
      title: "Interactive Docs with MDX",
      description: "Go beyond static markdown. Embed custom React components directly into your content to create interactive charts, alerts, and dynamic examples that engage your readers.",
      icon: <Zap className="h-8 w-8 mb-4 text-emerald-400" />,
      visual: <FakeCodeEditor language="MDX" content={`import { Chart } from './components/Chart';\n\n# Monthly Active Users\n\nHere is a chart of our active users:\n\n<Chart data={...} />`} />,
    },
    {
      title: "Content Lives in GitHub",
      description: "Keep your documentation in sync by managing it directly within your GitHub repository. Every commit can be a documentation update, making it seamless for developers to contribute.",
      icon: <Github className="h-8 w-8 mb-4 text-emerald-400" />,
      visual: <FakeCodeEditor language="File Structure" content={`/your-repo\n  ├── /src\n  │   └── ...\n  └── /docs\n      └── new-feature.mdx`} />,
    },
    {
      title: "Deploy Globally in Seconds",
      description: "Connect your GitHub repository and deploy your documentation site globally via Vercel or Netlify. Every 'git push' automatically builds and updates your live site.",
      icon: <Rocket className="h-8 w-8 mb-4 text-emerald-400" />,
      visual: <FakeCodeEditor language="Terminal" content={`$ git push origin main\n\n> Vercel: Build initiated...\n> Vercel: Deployment successful!\n> URL: https://your-docs.vercel.app`} />,
    },
  ];
  
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen overflow-x-hidden">
      <div className="absolute inset-0 z-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>        
      <Navbar className="fixed top-0 left-0 right-0" isAuthenticated={isAuthenticated}/>

      <main className="pt-32 relative z-10">
        <div className="container mx-auto sm:px-2 px-6">
          <section className="text-center pt-16 pb-24">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Create Documentation, Effortlessly.
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-8">
              A simple, fast, and functional documentation site that allows your team to view, edit, and manage markdown-based content with ease.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/docs">
                <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-8 py-6 text-lg shadow-lg shadow-emerald-500/20">
                  Go to Docs
                </Button>
              </Link>
            </div>
          </section>

          <section className="space-y-24 md:space-y-32">
            {features.map((feature, index) => (
              <div key={feature.title} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className={`md:pr-8 ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                  <div className="flex flex-row gap-2 items-center">
                    <span>{feature.icon}</span>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                </div>
                <div>
                  {feature.visual}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-800 mt-32 relative z-10">
        <div className="container mx-auto px-6 py-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Curio Docs</p>
        </div>
      </footer>
    </div>
  );
}
