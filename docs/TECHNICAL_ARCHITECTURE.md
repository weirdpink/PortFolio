# Technical Architecture Document

## 1. Tech Stack Overview
This project relies on a modern, robust, and highly performant static stack optimized for fast iteration and excellent developer experience.

- **Framework:** React 19.1.0 with TypeScript
  - *Reasoning:* React's component-based architecture is perfect for UI reuse. TypeScript ensures type safety (crucial for maintaining a centralized data store without a backend), eliminating entire classes of runtime errors.
- **Build Tool:** Vite 6.3.5
  - *Reasoning:* Dramatically faster cold starts and Hot Module Replacement (HMR) compared to Webpack/Create React App.
- **Styling:** Tailwind CSS v4
  - *Reasoning:* Utility-first CSS allows for rapid prototyping and maintaining a strict design system without context switching between CSS and JS files. v4's new `@theme` block provides excellent design token management.
- **Routing:** React Router v7.6.3
  - *Reasoning:* Industry standard for client-side routing, necessary for navigating between the homepage and project detail pages without full page reloads.
- **Animation:** Motion (Framer Motion) v12.12.2
  - *Reasoning:* Declarative syntax for complex spring animations, scroll-triggered reveals, and layout transitions. It natively handles performance optimizations under the hood.
- **Icons:** Lucide React & react-icons
  - *Reasoning:* Lightweight, consistent vector graphics that integrate seamlessly with Tailwind's text colors (`currentColor`).

## 2. File and Folder Structure
```
Portfolio Website/
├── APP ICONS/            # Source directory for raw, macOS-style app icon PNGs
├── public/
│   ├── app_icons/        # Web-optimized app icons served at runtime
│   └── posters/          # Image assets for the poster gallery
├── src/
│   ├── app/
│   │   ├── components/   # Reusable UI building blocks
│   │   │   ├── about.tsx          # Biography & facts grid
│   │   │   ├── contact.tsx        # Large mailto CTA
│   │   │   ├── cursor.tsx         # Custom interactive mouse cursor
│   │   │   ├── footer.tsx         # Outbound links & copyright
│   │   │   ├── hero.tsx           # Landing viewport content
│   │   │   ├── marquee.tsx        # Infinite CSS-based text scroller
│   │   │   ├── nav.tsx            # Sticky header & mobile menu
│   │   │   ├── reveal.tsx         # HOC for scroll-triggered fade animations
│   │   │   ├── section-marker.tsx # Eyebrow typography labels
│   │   │   ├── skills.tsx         # Typographic layout for proficiencies
│   │   │   ├── theme-toggle.tsx   # Light/dark mode switcher
│   │   │   └── work.tsx           # Project category grids
│   │   ├── pages/
│   │   │   ├── home.tsx           # Main assembly of homepage components
│   │   │   └── project-detail.tsx # Dynamic route view for individual case studies
│   │   ├── App.tsx       # Root component mapping routes to pages
│   │   └── data.ts       # Centralized "database" of all content
│   ├── imports/          # Raw SVG strings (imported via ?raw plugin)
│   ├── index.css         # Tailwind initialization and custom global styles
│   └── main.tsx          # React application mounting point
├── index.html            # HTML entry point (loads Google Fonts)
├── package.json          # Dependency management & build scripts
├── tailwind.config.ts    # Tailwind customization (if using v3 config style alongside v4)
├── tsconfig.json         # TypeScript compiler rules
└── vite.config.ts        # Vite plugins (React, Tailwind, path resolution)
```

## 3. Data Schema (`data.ts`)
Since there is no traditional backend, `data.ts` acts as a static, strongly-typed "database".

### `Project` Interface
Defines the schema for portfolio items.
- `id` (String): Unique identifier, used for URL routing (`/project/:id`).
- `title` (String): Name of the project.
- `description` (String): Short summary of the work.
- `category` ("Website" | "Logo" | "Brand Identity"): Enum forcing strict categorization for UI tabs.
- `tools` (String[]): Array of tools used (e.g., "React", "TypeScript").
- `cover` (String, Optional): Path to the thumbnail image.
- `gallery` (String[], Optional): Array of paths to images for the detailed view.
- `caseStudy` (String, Optional): Path to a larger case study or markdown file.
- `visitUrl` (String, Optional): External link to the live project.

### Global Exports
- `skillGroups`: Array of objects containing a `title` and an array of `items` (Strings). Used to map over the 3 skill columns.
- `socialLinks`, `contactEmail`, `resumeUrl`: String constants ensuring contact information is only updated in one place.

## 4. Configuration Notes
- **Path Aliasing:** Vite and TS are configured so `@/` maps to `src/`.
- **SVG Imports:** Vite handles SVG files imported with `?raw`. This imports the SVG markup as a string, allowing React to parse it via `dangerouslySetInnerHTML` for dynamic color changing via `currentColor`.
- **Environment Variables:** Currently, there are NO environment variables required (`.env` is not needed) because the site connects to no external secure APIs.

## 5. Build and Deployment Considerations
- **Command:** `npm run build` utilizes `tsc -b && vite build`.
- **Output:** Generates static files into the `dist/` directory.
- **Hosting:** Recommended for Vercel, Netlify, or GitHub Pages. 
- **Routing Note:** Because React Router is used in a Single Page App (SPA) architecture, the hosting provider MUST be configured to redirect all 404s to `index.html` (e.g., using a `vercel.json` or `_redirects` file) so deep links like `/project/p-brand2` don't throw server errors.

## 6. Performance Optimizations
- **Font Loading:** Google Fonts are loaded in `index.html` with `preconnect` to reduce render-blocking latency.
- **Image Formats:** SVGs are used wherever possible for infinite scalability and zero layout shift. raster images should ideally be converted to WebP in the build pipeline or via CDN.
- **Code Splitting:** Vite natively splits vendor chunks from application code to improve caching.
