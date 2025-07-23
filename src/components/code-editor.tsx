export default function FakeCodeEditor({ content, language }: { content: string, language: string }) {
  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-lg shadow-2xl backdrop-blur-sm w-full h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-sm text-gray-400">{language}</span>
      </div>
      <pre className="p-4 text-sm whitespace-pre-wrap">
        <code className="font-mono text-gray-300">{content}</code>
      </pre>
    </div>
  );
}
