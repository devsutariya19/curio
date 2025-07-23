import ResponsiveBreadcrumbs from '@/components/responsive-breadcrumbs'
import React from 'react'

export default function Docs() {
  return (
    <div className="flex flex-col gap-4">
      <ResponsiveBreadcrumbs slug={[]} />
      <h1 className="text-4xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Getting Started</h1>
      <p className="text-gray-300">
        Welcome to DocuFlow. This guide will walk you through the initial setup and basic features to get your documentation site up and running as quickly as possible.
      </p>
      <h2 className="text-3xl font-bold text-white mt-12 mb-4 border-b border-gray-700 pb-2">Project Structure</h2>
      <p className="text-gray-300">
        The core of DocuFlow is its file-based routing. All your documentation lives inside the <code className="bg-gray-700 text-emerald-400 rounded px-1 py-0.5">/docs</code> directory.
      </p>
    </div>
  )
}
