export type Project = {
  id: string;
  title: string;
  description: string;
  category: "Website" | "Poster" | "Logo" | "Brand Identity";
  tools: string[];
  cover?: string;
  gallery?: string[];
  link?: string;
  caseStudy?: string;
};

export const projects: Project[] = [
  {
    id: "p-posters",
    title: "Poster Designs",
    description: "A collection of 6 poster designs.",
    category: "Poster",
    tools: [],
    gallery: [
      "/posters/Gazelle.jpg",
      "/posters/Hóng Yóu Jiǎozi.jpg",
      "/posters/Nothing Headphone (a).jpg",
      "/posters/Mazesoba.jpg",
      "/posters/Shox Ride 2.jpg",
      "/posters/Makizushi.jpg",
    ],
  },
  {
    id: "p-web1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management, stripe integration, and an admin dashboard.",
    category: "Website",
    tools: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
    link: "https://example.com",
    caseStudy: "/project/p-web1",
  },
  {
    id: "p-logos",
    title: "Logo Archive",
    description: "A collection of wordmarks and symbols.",
    category: "Logo",
    tools: [],
  },
  {
    id: "p-web2",
    title: "AI Writing Assistant",
    description: "An AI-powered writing tool that helps you craft compelling stories and articles.",
    category: "Website",
    tools: ["Vue.js", "Express", "OpenAI API"],
    caseStudy: "/project/p-web2",
  },
  {
    id: "p-brand1",
    title: "Stray Identity",
    description: "A full identity system: mark, type, colour and layout rules.",
    category: "Brand Identity",
    tools: [],
    caseStudy: "/project/p-brand1",
  },
  {
    id: "p-web3",
    title: "Financial Dashboard",
    description: "A complex data visualization dashboard for tracking personal finances and investment portfolios.",
    category: "Website",
    tools: ["Next.js", "D3.js", "Framer Motion"],
    link: "https://example.com",
    caseStudy: "/project/p-web3",
  },
  {
    id: "p-brand2",
    title: "Onyx Rebrand",
    description: "Visual identity and packaging system for an emerging coffee roaster.",
    category: "Brand Identity",
    tools: [],
    caseStudy: "/project/p-brand2",
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
  { label: "X", value: "@armaantxs", href: "https://x.com/armaantxs" },
];
