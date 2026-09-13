# Feature Ticket List

## Foundation & Data Layer

### PORTFOLIO-001: Project Setup & Tailwind Config
**Description:** Initialize Vite + React TypeScript project. Configure Tailwind CSS v4, including `@theme` tokens for custom fonts (Inter, Cormorant Garamond), colors, and spacing.
**Acceptance Criteria:**
- Vite dev server runs without errors.
- Tailwind compiles correctly.
- Global CSS includes Google Font imports and custom utility classes (`.eyebrow`, `.italic-serif`, `.contact-underline`).
**Dependencies:** None
**Priority:** Must-Have

### PORTFOLIO-002: Static Data Architecture
**Description:** Create `data.ts` to act as the single source of truth for all portfolio content.
**Acceptance Criteria:**
- Define TypeScript `interface Project`.
- Export array of 8 projects (3 websites, 1 poster, 2 logos, 2 brand identities).
- Export `skillGroups` (Technical, Design, Environment).
- Export `socialLinks` and `contactEmail`.
**Dependencies:** PORTFOLIO-001
**Priority:** Must-Have

### PORTFOLIO-003: Routing Setup
**Description:** Implement React Router for navigation between the home page and individual project detail pages.
**Acceptance Criteria:**
- Root route `/` renders the Home component.
- Dynamic route `/project/:id` renders the Project Detail component.
- Fallback wildcard route `*` redirects to Home or displays a 404 page.
**Dependencies:** PORTFOLIO-001
**Priority:** Must-Have

## Global UI Features

### PORTFOLIO-004: Responsive Navigation Bar
**Description:** Build a sticky top navigation bar with a logo, anchor links, theme toggle, and mobile hamburger menu.
**Acceptance Criteria:**
- Sticky positioning with glassmorphism blur applied on scroll.
- Anchor links (About, Work, Skills, Contact) smoothly scroll to sections.
- Mobile view collapses links into a hamburger slide-down menu.
**Dependencies:** PORTFOLIO-001
**Priority:** Must-Have

### PORTFOLIO-005: Light/Dark Theme Toggle
**Description:** Implement a theme toggle button that switches between light and dark Tailwind modes.
**Acceptance Criteria:**
- Button toggles `dark` class on the `<html>` element.
- Icon switches between Sun and Moon based on state.
- Preference is saved to `localStorage` and initializes on page load based on user history or system preference.
**Dependencies:** PORTFOLIO-004
**Priority:** Must-Have

### PORTFOLIO-006: Scroll Reveal Animation Component
**Description:** Create a reusable `<Reveal>` and `<StaggerGroup>` component using Framer Motion to animate elements as they enter the viewport.
**Acceptance Criteria:**
- Elements fade from opacity 0 to 1 and translate Y from 28px to 0.
- Animation triggers only when the element is scrolled into view (with a negative margin offset).
- Supports staggering for lists.
**Dependencies:** PORTFOLIO-001
**Priority:** Should-Have

### PORTFOLIO-007: Custom Animated Cursor
**Description:** Replace the default mouse cursor with a custom circle that follows the pointer.
**Acceptance Criteria:**
- Circle follows mouse coordinates smoothly.
- Circle scales up when hovering over interactive elements (`a`, `button`, or elements with `data-cursor="hover"`).
- Component unmounts or hides completely on touch/mobile devices.
**Dependencies:** PORTFOLIO-001
**Priority:** Nice-to-Have

## Core Sections

### PORTFOLIO-008: Hero Section
**Description:** Build the landing viewport introducing the user.
**Acceptance Criteria:**
- Displays the name "Armaan Verma" in massive serif typography.
- Includes an animated tagline ("writes software", "designs interfaces", "engineers security") with italic gray accents.
- Includes a subtle scroll-down indicator arrow.
**Dependencies:** PORTFOLIO-001, PORTFOLIO-006
**Priority:** Must-Have

### PORTFOLIO-009: Infinite Marquee
**Description:** A continuous scrolling text banner serving as a visual break.
**Acceptance Criteria:**
- Displays "DESIGN CODE SECURITY" repeating across the screen.
- Scrolls continuously to the left via CSS animations.
- Does not cause horizontal overflow on the page.
**Dependencies:** PORTFOLIO-001
**Priority:** Nice-to-Have

### PORTFOLIO-010: About Section
**Description:** A biographical section explaining the engineering/design/security trifecta.
**Acceptance Criteria:**
- Displays section marker `[ 01 ] — ABOUT`.
- Main statement paragraph utilizes `.italic-serif` accents for key words.
- Includes a 2x2 grid of quick facts (Study, Focus, Year, Interests).
**Dependencies:** PORTFOLIO-001, PORTFOLIO-006
**Priority:** Must-Have

### PORTFOLIO-011: Work Section (Project Showcase)
**Description:** The core portfolio section displaying projects pulled from `data.ts`.
**Acceptance Criteria:**
- Displays section marker `[ 02 ] — WORK`.
- Groups projects by category (Websites, Posters, Logos, Brand Identity).
- Websites render as large cards with hover-zoom images.
- Posters render as a masonry-style image gallery.
- Clicking a project routes to `/project/:id`.
**Dependencies:** PORTFOLIO-002, PORTFOLIO-003
**Priority:** Must-Have

### PORTFOLIO-012: Skills Section
**Description:** A purely typographic display of software and design proficiencies.
**Acceptance Criteria:**
- Displays section marker `[ 03 ] — SKILLS`.
- Maps over `skillGroups` from `data.ts`.
- Each category (Technical, Design, Environment) has its own row.
- Skills are displayed as large flowing text separated by `/`, fading on hover.
**Dependencies:** PORTFOLIO-002
**Priority:** Must-Have

### PORTFOLIO-013: Contact Section & Footer
**Description:** The final CTA and outbound links.
**Acceptance Criteria:**
- Displays section marker `[ 04 ] — CONTACT`.
- Massive serif heading "Let's make something together".
- Primary `mailto:` link utilizing the `.contact-underline` animation and rotating arrow.
- Footer contains dynamic copyright year and maps over `socialLinks`.
**Dependencies:** PORTFOLIO-002
**Priority:** Must-Have

### PORTFOLIO-014: Project Detail Page
**Description:** The individual case study view for a specific project.
**Acceptance Criteria:**
- Reads the `:id` param from the URL and fetches the corresponding project from `data.ts`.
- Displays project title, category, description, and tools used.
- Displays the `cover` image and maps over the `gallery` array if available.
- "Back to Home" navigation button.
**Dependencies:** PORTFOLIO-002, PORTFOLIO-003, PORTFOLIO-011
**Priority:** Must-Have
