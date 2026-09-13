# Product Requirements Document (PRD)

## 1. Product Overview
The product is a highly polished, interactive, personal portfolio website for Armaan Verma. Armaan is a second-year Computer Science student at Bennett University specializing in cybersecurity. The portfolio serves as a digital representation of his skills spanning three core domains: Software Engineering, Interface Design, and Security. The site is a fully static, single-page-like application (with dedicated project detail routes) designed to showcase his projects, technical stack, and design sensibilities to potential employers, freelance clients, and collaborators.

## 2. Target User
- **Recruiters & Hiring Managers:** Looking to validate Armaan's skills, review his resume, and see real-world project outcomes for internship or full-time opportunities.
- **Freelance Clients:** Startups or founders looking for a hybrid engineer/designer who can build robust systems and pixel-perfect interfaces.
- **Peers & Collaborators:** Other developers and designers looking to connect, collaborate on open-source, or share ideas.

## 3. Problem Statement
**The Problem:** Traditional resumes and static PDFs fail to adequately convey the dynamic, interactive nature of a modern engineer/designer's skill set. A standard template website often blends in, failing to capture the unique "trifecta" value proposition of a candidate who excels in code, design, and security.
**The Solution:** A bespoke, highly interactive portfolio website that acts as a live demonstration of Armaan's capabilities. It uses refined typography, custom animations, and a stark monochromatic aesthetic to immediately communicate high-tier design and engineering competence before a single word is read.

## 4. Core Features

### Must-Have (MVP for Launch)
- **Hero Section:** High-impact landing area with animated role descriptions.
- **Work Showcase:** Categorized project display (Websites, Posters, Logos, Brand Identity) pulling from a centralized data source.
- **About Section:** Concise biography outlining the "trifecta" approach (Engineering, Design, Security).
- **Skills Section:** Minimalist typographic layout listing Technical, Design, and Environment proficiencies.
- **Contact & Footer:** Direct mailto links and outbound social links (GitHub, X, Instagram).
- **Responsive Design:** Fully functional layout across mobile, tablet, and desktop viewports.
- **Static Data Layer:** All content driven by a single `data.ts` file for easy updates without a CMS.

### Nice-to-Have (Fast Follows)
- **Dark/Light Theme Toggle:** System preference detection and manual override with localStorage persistence.
- **Custom Animated Cursor:** A scalable, tracking cursor for enhanced interactivity on desktop.
- **Scroll Reveal Animations:** Staggered fade-up animations as elements enter the viewport.
- **Infinite Marquee:** A continuous scrolling text banner for visual flair.
- **Project Detail Pages:** Dedicated routes (`/project/:id`) for deep-dives into specific case studies.

## 5. User Flow
1. **Landing:** User arrives at the root URL. They are greeted by the Hero section establishing Armaan's identity.
2. **Scrolling:** As the user scrolls down, the infinite marquee provides a visual break, followed by the About section which reveals personal context.
3. **Exploration (Work):** The user encounters the Work section. They can view different categories of projects. Clicking on a project may reveal a deeper view (if a case study route exists) or link out to a live URL.
4. **Validation (Skills):** The user scrolls past the work to see the specific tools and languages Armaan uses.
5. **Action (Contact):** At the bottom of the page, a massive typography-driven CTA prompts the user to reach out via email, or follow on social media via the footer.

## 6. MVP Definition
The Minimum Viable Product is a single-page static React application deployed to a fast CDN (e.g., Vercel or Netlify). It must accurately render all text content, display project images, and link correctly to external social profiles and email clients. The MVP can forgo complex motion/animations, custom cursors, and dark mode if necessary for speed, but must remain perfectly readable and responsive.

## 7. Success Metrics
- **Engagement:** Average time on site > 1.5 minutes.
- **Conversion:** Number of clicks on the "Contact" mailto link or resume download link.
- **Performance:** Lighthouse score of 95+ across Performance, Accessibility, Best Practices, and SEO.

## 8. Out of Scope for V1
- Backend API or Database (no user accounts, no dynamic comments).
- Content Management System (CMS) like Sanity or Strapi (updates will be made directly in codebase).
- A custom contact form that sends emails via an API (will rely purely on `mailto:` for V1).
- E-commerce or direct booking capabilities.
