# Project Plan

## MVP (Minimum Viable Product)

### Goal:
Create a simple, fast, and functional documentation site that allows users to view markdown-based content, edit docs in a basic markdown editor, and authenticate via Supabase. The site will be responsive and user-friendly for non-technical users.

---

### **1. Core Features**

#### **1.1 Folder-Based Routing**
- **Objective**: Automatically generate pages based on markdown files stored in the `docs` folder.
- **Tasks**:
  - Set up docs with folder-based routing.
  - Create a `docs` folder structure where each `.mdx` or `.md` file will be mapped to a route.
  - Implement automatic rendering of markdown as HTML using `remark` and `rehype`.

#### **1.2 Markdown Rendering** (MDX)
- **Objective**: Render markdown content with the ability to embed React components (MDX).
- **Tasks**:
  - Install and configure `@next/mdx` for markdown and MDX support.
  - Render markdown content and display it as HTML.
  - Implement a basic `table of contents` based on headers.

#### **1.3 Simple Page Layout** (Tailwind CSS)
- **Objective**: Create a basic, clean, and responsive layout using Tailwind CSS.
- **Tasks**:
  - Implement a simple, responsive header with the site title.
  - Create a sidebar or top navbar with links to docs sections.
  - Add a footer with basic site information (e.g., version, contact info).

#### **1.4 Basic Authentication** (Supabase)
- **Objective**: Allow users to sign in and out using Supabase Auth (email/password or OAuth).
- **Tasks**:
  - Set up Supabase for authentication (using Supabase's built-in auth system).
  - Implement login and registration pages.
  - Handle user sessions and authentication state (login/logout).

#### **1.5 Simple Content Editing** (Markdown Editor)
- **Objective**: Provide a basic markdown editor to edit docs content (no real-time collaboration for now).
- **Tasks**:
  - Set up a markdown editor using `react-markdown-editor` or similar.
  - Allow users to save content to Supabase (either as a new document or update an existing one).
  - Ensure that the content can be viewed after saving.

#### **1.6 Hosting** (Vercel or Netlify)
- **Objective**: Host the app on a platform with easy deployment and scalability.
- **Tasks**:
  - Set up deployment on Vercel (or Netlify) for automatic builds and deployments from GitHub.
  - Ensure the app works in production and serves static files efficiently.

---

### **2. Database & Data Structure** (Supabase)

#### **2.1 Supabase Setup**
- **Objective**: Set up Supabase for storing user information and document content.
- **Tasks**:
  - Set up Supabase and create a PostgreSQL database.
  - Create a table for `docs` to store document content (title, markdown content, etc.).
  - Create a table for `users` to manage user data and roles (Admin, Contributor, Viewer).

#### **2.2 Content Management**
- **Objective**: Allow users to create, read, and update documentation content.
- **Tasks**:
  - Implement basic CRUD operations for docs (Create, Read, Update, Delete).
  - Ensure docs content is stored in Supabase and can be retrieved and edited.
  
---

### **3. Basic User Management**

#### **3.1 Role-Based Access**
- **Objective**: Provide a way to define different roles for users (Admin, Contributor, Viewer).
- **Tasks**:
  - Create user roles in the Supabase database.
  - Implement role-based access control to restrict editing and viewing rights.

---

### **4. Testing & Deployment**

#### **4.1 Unit & Integration Testing**
- **Objective**: Ensure core features (auth, markdown rendering, content management) are working correctly.
- **Tasks**:
  - Write basic unit tests for the markdown rendering and content management functionality.
  - Test authentication flow (login/logout) to ensure it works seamlessly.
  - Run end-to-end tests to check for errors or broken links.

#### **4.2 Deployment to Production**
- **Objective**: Deploy the MVP to production with automated builds.
- **Tasks**:
  - Set up automatic deployments on Vercel/Netlify.
  - Ensure all pages render correctly and the authentication works in production.

---

## Nice-to-Have Features

### Goal:
Add more advanced functionality to enhance the documentation website, improve collaboration, and provide a richer user experience.

---

### **1. Advanced Content Management**

#### **1.1 Real-Time Collaborative Editing**
- **Objective**: Allow multiple users to edit the same document at the same time.
- **Tasks**:
  - Use **Supabase Realtime** to sync document changes across users in real-time.
  - Implement a system where edits appear instantly to all users viewing the same doc.

#### **1.2 Version Control**
- **Objective**: Allow users to view and revert to previous versions of documentation.
- **Tasks**:
  - Store historical versions of each document in Supabase.
  - Allow users to view past versions and roll back to a specific version.
  - Create a UI for displaying and navigating versions of a document.

---

### **2. Enhanced User Management**

#### **2.1 User Permissions**
- **Objective**: Allow granular control over who can edit, view, and manage docs.
- **Tasks**:
  - Implement more granular permissions (e.g., admins can manage roles, contributors can edit docs, viewers can only view).
  - Allow admins to invite users with specific roles and restrict access to certain docs.

#### **2.2 GitHub OAuth Authentication**
- **Objective**: Provide GitHub authentication to easily link users with their GitHub accounts.
- **Tasks**:
  - Implement GitHub OAuth authentication through Supabase Auth.
  - Allow users to sign in with their GitHub accounts for a seamless experience.

---

### **3. User Interface Enhancements**

#### **3.1 Rich Markdown Editing**
- **Objective**: Improve the editing experience by providing a WYSIWYG editor or rich markdown editor.
- **Tasks**:
  - Integrate a richer editor (e.g., Quill.js, Draft.js) that shows live previews of the content.
  - Allow users to format content using a toolbar for easy markdown manipulation.

#### **3.2 Search Functionality**
- **Objective**: Enable search across all documentation to help users quickly find content.
- **Tasks**:
  - Implement full-text search in Supabase using PostgreSQL's built-in search features.
  - Add a search bar that lets users search by keywords, categories, and tags.

#### **3.3 Dark Mode**
- **Objective**: Provide a dark mode option for users who prefer it.
- **Tasks**:
  - Implement a dark/light mode toggle using Tailwind CSS.
  - Ensure styles and components adapt to both modes.

---

### **4. Enhancements for Non-Technical Users**

#### **4.1 Drag-and-Drop Media Upload**
- **Objective**: Allow users to drag and drop images, videos, and other media directly into the editor.
- **Tasks**:
  - Integrate a drag-and-drop file upload system.
  - Automatically generate markdown for embedded images and media.

#### **4.2 Commenting System**
- **Objective**: Allow users to comment on docs pages for feedback or clarification.
- **Tasks**:
  - Create a `comments` table in Supabase to store user comments.
  - Display comments below each page and allow users to add new comments.

---

### **5. Analytics and Feedback**

#### **5.1 User Analytics**
- **Objective**: Track user interactions with the documentation to improve it.
- **Tasks**:
  - Integrate Google Analytics or another analytics platform to track page views and user activity.
  - Track how often docs are updated, what sections are visited most, and what content users are searching for.

#### **5.2 Feedback System**
- **Objective**: Allow users to submit feedback about documentation.
- **Tasks**:
  - Create a simple feedback form that users can fill out.
  - Store feedback in Supabase and allow admins to review and act upon it.