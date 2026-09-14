# Armaan Verma — Portfolio

A responsive personal portfolio for Armaan Verma, a Computer Science student and freelance developer/designer specialising in cybersecurity.

The site combines an editorial visual language with project case studies, a skills overview, contact links, a résumé download, and a small music player. It is a client-side React application built with Vite and TypeScript.

## Features

- Responsive portfolio homepage with hero, about, work, skills, and contact sections
- Image-based project grid with dedicated case-study pages
- Animated reveals and staggered content using Motion
- Responsive navigation with anchor links
- Résumé download, email, and social contact links
- Optional music player
- Reduced-motion support
- Image fallback component for failed or missing images

## Tech stack

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Motion
- React Router
- Lucide React

## Requirements

- Node.js 18 or newer
- npm

## Getting started

~~~bash
git clone <repository-url>
cd portfolio
npm install
npm run dev
~~~

Vite will print the local development URL, usually http://localhost:5173.

## Available scripts

| Command | Description |
| --- | --- |
| npm run dev | Start the Vite development server |
| npm run build | Type-check and create a production build in dist/ |
| npm run preview | Serve the production build locally |
| npm run lint | Run TypeScript’s no-emit validation |
| npm run check:assets | Verify every code-referenced static asset exists under public/ |
| npm run check | Run type, asset, and production-build checks |

Before opening a pull request:

~~~bash
npm run check
~~~

## Project structure

~~~text
.
├── public/                    # Static images, audio, résumé, and other assets
│   ├── branding/
│   ├── engineering/
│   ├── logos/
│   ├── posters/
│   ├── resume.pdf
│   └── For the First Time.mp3
├── src/
│   ├── app/
│   │   ├── components/        # Reusable page sections and UI components
│   │   ├── pages/             # Home, project detail, and not-found pages
│   │   ├── constants.ts       # Shared animation constants
│   │   ├── data.ts            # Portfolio content and project data
│   │   └── App.tsx            # Application shell and routes
│   ├── styles/
│   │   ├── fonts.css          # Local font declarations
│   │   ├── index.css          # Global style entry point
│   │   ├── tailwind.css       # Tailwind layers
│   │   └── theme.css          # Design tokens and base styles
│   └── main.tsx               # React entry point
├── index.html
├── package.json
└── vite.config.ts
~~~

## Updating portfolio content

Most content is centralized in src/app/data.ts. Edit it to update project titles, descriptions, categories, years, roles, cover images, galleries, case-study text, skills, résumé path, music, and contact links.

### Adding a project

Add a new object to the projects array:

~~~ts
{
  id: "p-new-project",
  title: "Project title",
  description: "Short description for the project card.",
  category: "Website",
  discipline: "Engineering",
  tools: ["React", "TypeScript"],
  cover: "/engineering/new-project-cover.jpg",
  gallery: ["/engineering/new-project-cover.jpg"],
  caseStudy: "/project/p-new-project",
  year: "2026",
  role: "Frontend Engineer",
  overview: "Longer case-study overview.",
  features: ["Feature one", "Feature two"],
}
~~~

Place referenced files inside public/. For example, public/engineering/new-project-cover.jpg is referenced as /engineering/new-project-cover.jpg.

Project detail pages are handled by src/app/pages/project-detail.tsx and look up projects by id.

## Styling and design tokens

Global colors, typography, and base styles live in src/styles/theme.css. The current visual system uses:

- White and light-gray surfaces with an editorial layout
- Serif display typography and sans-serif utility text
- Thin borders and generous whitespace
- Black as the primary ink color
- #C5C5C5 for the Skills, Contact, and Footer region

Section-level layout and responsive behavior are defined in src/app/components/. Prefer editing the closest component instead of adding one-off global rules.

## Routing

Routes are defined in src/app/App.tsx:

- / — Home page
- /project/:id — Project case study
- Any other path — Not-found page

The app preserves the home-page scroll position when returning from a case-study page.

## Assets

Static assets belong in public/ and should use root-relative paths:

~~~tsx
<img src="/branding/brand-1.jpg" alt="Brand identity project" />
~~~

Use meaningful alt text for new images. Use ImageWithFallback when a visual needs a fallback state.

The résumé should remain at public/resume.pdf unless resumeUrl in src/app/data.ts is updated.

## Accessibility and motion

- Keep descriptive alt text on meaningful images.
- Preserve visible keyboard focus states.
- Preserve prefers-reduced-motion behavior.
- Use semantic headings and links when adding sections.
- Check text and control contrast against the current background.

## Production build and deployment

Create a production build with npm run build. The generated site is written to dist/. Preview it with npm run preview.

The site can be deployed to static hosting such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages. Configure the host to fall back to index.html for client-side routes such as /project/p-posters.

`public/_headers` and `public/_redirects` provide browser security headers and an SPA fallback for Netlify and Cloudflare Pages. For other hosts, configure their equivalent headers and SPA rewrite rule before launch. Enable HSTS at the host only after the final domain is fully HTTPS.

## Troubleshooting

### Images are not loading

Confirm that the file exists under public/ and that the code uses a root-relative path beginning with /. Paths are case-sensitive on many production hosts.

### A project page is missing

Check that the project’s caseStudy path matches its id and that the project object exists in src/app/data.ts.

### The layout looks stale

Restart the Vite server after changing configuration or dependencies:

~~~bash
npm run dev
~~~

Also hard-refresh the browser if an old asset bundle is cached.

## License and attribution

Project-specific attribution information is recorded in ATTRIBUTIONS.md. Update that file when adding third-party assets or adapting external work.
