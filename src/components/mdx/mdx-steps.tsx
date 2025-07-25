import React from "react";

export function MdxSteps({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col my-5">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="flex">
          <div className="flex flex-col items-center mr-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white font-bold z-10">
              {index + 1}
            </div>
            {index !== React.Children.count(children) - 1 && (
              <div className="w-[2px] bg-gray-300 dark:bg-gray-600 flex-grow -mt-1" />
            )}
          </div>

          <div className="flex-1 pb-8">
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}

export function MdxStep({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="text-gray-700 dark:text-gray-300 space-y-4">
        {children}
      </div>
    </div>
  );
}
