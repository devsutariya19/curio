import { cn } from "@/lib/utils";
import { Copy, Play } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export function ApiSpec({ spec }: {spec: any}) {
  const fullUrl = `${spec.url}${spec.path}`;
  
  let curlRequest: string;
  const requestBodyExamples = spec.requestBody?.content?.['application/json']?.examples;

  if (spec.method === 'POST' && requestBodyExamples) {
    const firstExampleKey = Object.keys(requestBodyExamples)[0];
    const sampleBody = JSON.stringify(requestBodyExamples[firstExampleKey].value, null, 2);
    curlRequest = `curl -X ${spec.method} ${fullUrl} \\
      -H "Content-Type: application/json" \\
      -d '${sampleBody}'`;
  } else {
    const queryParams = spec.parameters?.filter((p: any) => p.in === 'query').map((p: any) => `${p.name}=...`).join('&') || '';
    curlRequest = `curl -X ${spec.method} "${fullUrl}${queryParams ? `?${queryParams}`: ''}"`;
  }
  
  const methodClass = spec.method === 'GET' ? 'text-green-400' : 'text-blue-400';

  return (
    <Card className="bg-gray-800 text-gray-300 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="space-y-8">
          {spec.parameters && spec.parameters.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-white border-b border-gray-800 pb-2 mb-4">Parameters</h2>
              <div className="flex flex-col">
                {spec.parameters.map((param: any) => (
                  <div key={param.name} className="py-3 border-b border-gray-800 last:border-b-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-sm text-white">{param.name}</span>
                      <span className="font-mono text-xs text-gray-400">{param.schema?.type || 'string'}</span>
                      <Badge variant="outline" className="border-gray-700 text-gray-400">{param.in}</Badge>
                      {!param.required && <Badge variant="secondary" className="bg-gray-700 text-gray-300 border-gray-600">Optional</Badge>}
                    </div>
                    {param.description && <p className="text-gray-400 text-sm mt-2">{param.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {spec.requestBody && (
            <section>
              <h2 className="text-lg font-semibold text-white border-b border-gray-600 pb-2 mb-4">Request Body</h2>
              <div className="py-3">
                <p className="text-gray-400 text-sm">{spec.requestBody.description}</p>
                {spec.requestBody.required && <Badge variant="secondary" className="bg-gray-700 text-gray-300 border-gray-600 mt-2">Required</Badge>}
              </div>
            </section>
          )}
          
          {spec.responses && (
            <section>
              <h2 className="text-lg font-semibold text-white border-b border-gray-800 pb-2 mb-4">Responses</h2>
              <div className="flex flex-col space-y-4">
                {Object.entries(spec.responses).map(([code, response]: any) => (
                  <div key={code} className="flex items-start gap-3">
                    <Badge className={code.startsWith('2') ? "text-green-300 bg-green-900/50 border-green-700 mt-1" : "text-red-300 bg-red-900/50 border-red-700 mt-1"}>{code}</Badge>
                    <p className="text-gray-400">{response.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <div className="space-y-4">
          <Card className="bg-[#1C1C1C] border-gray-800 overflow-hidden">
            <CardHeader className="flex-row items-center justify-between !py-2 !px-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <span className={cn("font-mono text-xs font-bold", methodClass)}>{spec.method}</span>
                <span className="text-gray-400 text-xs font-mono">{spec.path}</span>
              </div>
              {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <Copy className="h-4 w-4" />
              </Button> */}
            </CardHeader>
            <CardContent className="!p-0">
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="language-bash">{curlRequest}</code>
              </pre>
            </CardContent>
          </Card>

          {Object.entries(spec.responses).map(([code, response]: any) => {
            const responseExamples = response.content?.['application/json']?.examples;
            if (!responseExamples) return null;

            const firstExampleKey = Object.keys(responseExamples)[0];
            const sampleResponse = JSON.stringify(responseExamples[firstExampleKey].value, null, 2);

            return (
              <Card key={code} className="bg-[#1C1C1C] border-gray-800 overflow-hidden">
                <CardHeader className="flex-row items-center justify-between !py-2 !px-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <Badge className={code.startsWith('2') ? "text-green-300 bg-green-900/50 border-green-700" : "text-red-300 bg-red-900/50 border-red-700"}>{code}</Badge>
                    <span className="text-gray-400 text-xs">{response.description}</span>
                  </div>
                  {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </Button> */}
                </CardHeader>
                <CardContent className="!p-0">
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="language-json">{sampleResponse}</code>
                  </pre>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </Card>
  );
};