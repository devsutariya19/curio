# Curio Docs

A fast, modern, and collaborative documentation site powered by Next.js.

This project provides a complete solution for building a documentation website with built-in content management. It's designed to be easy for non-technical users to contribute while offering advanced features for developers.

### [Curio Docs](https://curio-docs.vercel.app/)

---

## Features
- **File-Based Routing**: Routes are automatically generated based on the folder structure in the docs directory.
- **MDX Bundler Integration**: Allows you to write documentation using markdown and embed React components seamlessly.
- **OpenAPI Spec Generation**: If a folder contains a .yaml file, an OpenAPI spec will be auto-generated and made available at the corresponding route.

### Folder structure
``` Files
/docs
  ├── introduction.md         # Main documentation file for the intro page
  ├── setup.md                # Setup guide
  ├── api
  │   ├── get-api.md          # Overview of the API
  │   ├── put-api.md          # User-related API documentation
  │   ├── openapi.yaml        # OpenAPI specification for the API
  ├── getting-started.md      # Getting Started guide
  ├── advanced.md             # Advanced topics
  ├── troubleshooting.md      # Troubleshooting guide
```

## Routing
The file structure inside the docs folder dictates the routing of the app. Here's how the routing is mapped:
- `docs/introduction.md` → /introduction
- `docs/setup.md` → /setup
- `docs/api/store.md` → /api/
- `docs/api/user.md` → /api/user
- `docs/getting-started.md` → /getting-started

### Dynamic Routes
If you add subfolders or markdown files within any folder, those will be reflected in the sidebar and linked accordingly. For example:
- `docs/api/auth.md` → /api/auth

### OpenAPI Spec
If there's a .yaml file (e.g., openapi.yaml) within any folder, an OpenAPI spec will automatically be generated at that route. For example:
- `docs/api/openapi.yaml` → /api/openapi

## 🚀 Tech Stack

-   **Frontend**: Next.js
-   **Backend**: Supabase
-   **Styling**: Tailwind CSS, Shadcn
-   **Content**: MDX

## 🛠️ Getting Started

### Prerequisites

-   Node.js
-   npm or yarn
-   Supabase

### Installation

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    Create a file named `.env.local` in the root of your project and add your Supabase project credentials.
    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
