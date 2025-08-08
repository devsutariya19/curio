# Curio Docs

A fast, modern, and collaborative documentation site powered by Next.js and Supabase.

This project provides a complete solution for building a documentation website with built-in content management, real-time collaboration, and powerful AI-driven search. It's designed to be easy for non-technical users to contribute while offering advanced features for developers.

---

## ✨ Features

* **Folder-Based Routing**: Automatically create pages and sections by adding `.mdx` files to the `docs` folder.
* **MDX Support**: Embed interactive React components directly within your Markdown content.
* **Responsive Layout**: A clean, modern, and mobile-first UI built with Tailwind CSS.
* **GitHub Integration**: *(Planned)* Keep your documentation in sync by managing it directly within your GitHub repository.
* **Supabase Auth**: *(Planned)* Secure user authentication with role-based access control (Admin, Contributor, Viewer).

## 🚀 Tech Stack

-   **Framework**: Next.js
-   **Backend & Database**: Supabase
-   **Styling**: Tailwind CSS
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
