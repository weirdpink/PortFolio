export type Project = {
  id: string;
  title: string;
  description: string;
  category: "Website" | "Poster" | "Logo" | "Brand Identity";
  discipline: "Design" | "Engineering";
  tools: string[];
  cover: string;
  gallery: string[];
  link?: string;
  caseStudy: string;
  year: string;
  role: string;
  overview: string;
  features?: string[];
};

export const projects: Project[] = [
  {
    id: "p-posters",
    title: "Poster Designs",
    description: "A curated series of 6 modernist and typographic poster explorations.",
    category: "Poster",
    discipline: "Design",
    tools: ["Typography", "Layout Design", "Print", "Art Direction"],
    cover: "/posters/Gazelle.webp",
    gallery: [
      "/posters/Gazelle.webp",
      "/posters/Hóng Yóu Jiǎozi.webp",
      "/posters/Nothing Headphone (a).webp",
      "/posters/Mazesoba.webp",
      "/posters/Shox Ride 2.webp",
      "/posters/Makizushi.webp",
    ],
    caseStudy: "/project/p-posters",
    year: "2025 — 2026",
    role: "Graphic & Editorial Designer",
    overview: "A focused series of 6 large-format graphic posters exploring International Typographic Style, tactile textures, commercial product identity, and culinary ephemera. Each piece emphasizes grid tension, asymmetrical typography, and high-contrast composition.",
  },
  {
    id: "p-logos",
    title: "Logo Archive",
    description: "A collection of typographic wordmarks, geometric monograms, and brand symbols.",
    category: "Logo",
    discipline: "Design",
    tools: ["Vector Art", "Grid Systems", "Monograms", "Symbol Design"],
    cover: "/logos/logo-1.svg",
    gallery: [
      "/logos/logo-1.svg",
      "/logos/logo-2.svg",
      "/logos/logo-3.svg",
      "/logos/logo-4.svg",
      "/logos/logo-5.svg",
      "/logos/logo-6.svg",
    ],
    caseStudy: "/project/p-logos",
    year: "2025 — 2026",
    role: "Brand & Identity Designer",
    overview: "A curated archive of vector identity marks, modern monograms, and brutalist geometric symbols. Crafted with mathematical proportions, optical kerning, and negative space to ensure distinct legibility from micro-favicons to architectural signage.",
  },
  {
    id: "p-brand",
    title: "Brand Identity",
    description: "Comprehensive visual identity and packaging system spanning typography, editorial layout, and collateral.",
    category: "Brand Identity",
    discipline: "Design",
    tools: ["Identity Systems", "Packaging", "Art Direction", "Editorial Design"],
    cover: "/branding/brand-1.jpg",
    gallery: [
      "/branding/brand-1.jpg",
      "/branding/brand-2.jpg",
      "/branding/brand-3.jpg",
      "/branding/brand-4.jpg",
      "/branding/brand-5.jpg",
      "/branding/brand-6.jpg",
    ],
    caseStudy: "/project/p-brand",
    year: "2026",
    role: "Lead Visual Designer",
    overview: "An extensive visual identity design developed from the ground up, covering primary logomark construction, custom display typography pairings, tactile paper stocks, editorial stationery guidelines, and high-impact sustainable packaging systems.",
  },
  {
    id: "p-web1",
    title: "E-Commerce Platform",
    description: "A full-stack commerce engine featuring real-time inventory management, Stripe checkout, and an admin analytics dashboard.",
    category: "Website",
    discipline: "Engineering",
    tools: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
    cover: "/engineering/ecommerce-cover.jpg",
    gallery: ["/engineering/ecommerce-cover.jpg"],
    link: "https://github.com/weirdpink/PortFolio",
    caseStudy: "/project/p-web1",
    year: "2026",
    role: "Full-Stack Engineer",
    overview: "Engineered a high-throughput headless e-commerce store with sub-second catalog queries, optimistic UI updates, integrated Stripe webhooks, and an authenticated administrative suite for inventory tracking and revenue analytics.",
    features: [
      "Real-time inventory sync with optimistic UI updates",
      "Secure Stripe webhook-driven transaction processing",
      "Server-side cached product queries with automated indexing",
    ],
  },
  {
    id: "p-web2",
    title: "AI Writing Assistant",
    description: "An AI-powered writing tool that helps you craft compelling stories and structured editorial articles.",
    category: "Website",
    discipline: "Engineering",
    tools: ["TypeScript", "Next.js", "OpenAI API", "TailwindCSS"],
    cover: "/engineering/ai-cover.jpg",
    gallery: ["/engineering/ai-cover.jpg"],
    link: "https://github.com/weirdpink/PortFolio",
    caseStudy: "/project/p-web2",
    year: "2026",
    role: "Frontend & AI Systems Engineer",
    overview: "A minimal, distraction-free markdown authoring environment supercharged with streamed AI completion, iterative prompt chaining, semantic outline generation, and automated style consistency audits.",
    features: [
      "Streaming completion using Server-Sent Events (SSE) for minimal latency",
      "Hierarchical outline builder with dynamic token budgeting",
      "Keyboard-first shortcuts and responsive dual-pane markdown preview",
    ],
  },
  {
    id: "p-web3",
    title: "Financial Dashboard",
    description: "A complex data visualization dashboard for tracking personal finances, investment portfolios, and yield metrics.",
    category: "Website",
    discipline: "Engineering",
    tools: ["Next.js", "D3.js", "TypeScript", "Framer Motion"],
    cover: "/engineering/finance-cover.jpg",
    gallery: ["/engineering/finance-cover.jpg"],
    link: "https://github.com/weirdpink/PortFolio",
    caseStudy: "/project/p-web3",
    year: "2025",
    role: "Frontend Engineer",
    overview: "Engineered an institutional-grade financial intelligence dashboard rendering responsive SVG charts, historical asset benchmarks, dynamic currency conversions, and automated risk breakdown gauges.",
    features: [
      "Fluid interactive D3.js candlestick and area charts",
      "Custom math aggregation pipelines for multi-asset valuation",
      "Dark-mode optimized color themes passing strict AAA contrast standards",
    ],
  },
];

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Technical",
    items: ["Python", "Java", "C++", "HTML", "CSS"],
  },
  {
    title: "Design",
    items: ["Adobe Photoshop", "Adobe Illustrator", "Affinity"],
  },
  {
    title: "Environment & Productivity",
    items: [
      "VS Code",
      "Zed",
      "Warp",
      "Notion",
      "Claude Code",
      "Opencode",
      "Antigravity",
    ],
  },
];

export const resumeUrl = "/resume.pdf";

export const contactLinks: { label: string; value: string; href: string }[] = [
  { label: "Email", value: "worksarmaan@gmail.com", href: "mailto:worksarmaan@gmail.com" },
  { label: "GitHub", value: "@armaantxs", href: "https://github.com/armaantxs" },
  { label: "LinkedIn", value: "in/armaantxs", href: "https://www.linkedin.com/in/armaantxs" },
  { label: "Instagram", value: "@armaantxs", href: "https://www.instagram.com/armaantxs" },
  { label: "X", value: "@armaantxs", href: "https://x.com/armaantxs" },
];
