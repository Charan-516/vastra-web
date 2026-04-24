# Vastra - Premium Indian Fashion

This is a complete React + Vite + Tailwind CSS e-commerce application. 
Since this is a Node.js project, it uses a `package.json` file to manage dependencies rather than a Python `requirements.txt`.

## Prerequisites

- Node.js (v18 or higher)
- npm (or yarn/pnpm)

## Installation

1. Open your terminal in the project directory.
2. Install all necessary dependencies by running:

```bash
npm install
```

This will automatically install everything needed:
- `react`, `react-dom`
- `react-router-dom` (for navigation)
- `@supabase/supabase-js` (for backend/database)
- `lucide-react` (for icons)
- `react-hot-toast` (for notifications)
- `tailwindcss`, `vite` (and other build tools)

## Environment Variables

Create a `.env` file in the root of your project and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Running the Development Server

Start the local development server:

```bash
npm run dev
```

Visit `http://localhost:5173` (or the port Vite provides) in your browser to view the application.
