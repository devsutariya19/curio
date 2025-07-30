import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900 text-center text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10 flex flex-col items-center px-4">
        <h1 
          className="text-8xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
        >
          404
        </h1>
        
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-white">
          Page Not Found
        </h2>
        
        <p className="mt-4 max-w-sm text-lg text-gray-400">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <Button 
          asChild 
          className="mt-8 bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
