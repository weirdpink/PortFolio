# Frontend Specification Document

## 1. Design System

### Color Palette
The app relies on a stark, sophisticated monochromatic palette to let typography and imagery stand out.
- **Light Mode:**
  - Background: White `#ffffff`
  - Primary Text: Near Black `#0a0a0a` (Tailwind `neutral-950`)
  - Secondary Text: Dark Gray `#737373` (Tailwind `neutral-500`)
  - Borders/Dividers: `rgba(0, 0, 0, 0.1)` (Black with 10% opacity)
- **Dark Mode:**
  - Background: Near Black `#0a0a0a` (Tailwind `neutral-950`)
  - Primary Text: Off-White `#f5f5f5` (Tailwind `neutral-100`)
  - Secondary Text: Light Gray `#a3a3a3` (Tailwind `neutral-400`)
  - Borders/Dividers: `rgba(255, 255, 255, 0.1)` (White with 10% opacity)

### Typography Choices
- **Sans-Serif (Body & UI):** `Inter` (Google Fonts). Used for navigation, paragraph text, eyebrow labels, and buttons. Clean, highly legible, modernist.
- **Serif (Headings & Display):** `Cormorant Garamond` (Google Fonts). Used for massive section titles and elegant italic accents. Provides a high-end, editorial feel.

#### Typography Scale
- **Hero Title:** `clamp(3.5rem, 10vw, 8rem)`
- **Section Headings:** `clamp(3.5rem, 9vw, 7.5rem)`
- **Large Statements:** `clamp(1.9rem, 5.5vw, 4.25rem)`
- **Contact Heading:** `clamp(4rem, 12vw, 11rem)`
- **Body Text:** `15px` to `16px` with `leading-relaxed` (1.625 line height)
- **Eyebrows:** `11px` uppercase with extremely wide tracking (`tracking-[0.15em]`)

## 2. Component Specifications

### Nav (Header)
- **Layout:** Sticky top, full width, flex-between.
- **Behavior:** Transparent when at the very top. Upon scrolling, applies a glassmorphism effect (`backdrop-blur`) and a subtle bottom border.
- **Mobile:** Hamburger icon triggers a full-screen or slide-down overlay menu.

### Section Markers (Eyebrows)
- **Visuals:** Follows the pattern `[ 01 ] — ABOUT`.
- **Styling:** 11px, Inter, uppercase, wide letter spacing, secondary text color.

### Theme Toggle
- **Visuals:** Circular button, 1px border. Moon icon for light mode, Sun icon for dark mode.
- **Interaction:** On hover, background fills with the opposite color and icon inverts (e.g., in light mode, background turns black, icon turns white).

### CTAs (Links)
- **Visuals:** No solid background buttons. All primary actions are large typography links.
- **Interaction:** Utilizes the `.contact-underline` class. An underline expands from left-to-right on hover. Arrow icons rotate 45 degrees to indicate outbound or forward movement.

### Skills Layout
- **Visuals:** Purely typographic. 3 rows. Category label on the left.
- **Content:** Flowing inline text of skills separated by slashes (`/`).
- **Interaction:** Text fades to secondary color on hover.

## 3. Spacing & Layout Rules
- **Container Width:** Constrained via `mx-auto w-full`.
- **Horizontal Padding:** `px-6` (mobile) to `px-12` (desktop).
- **Vertical Section Padding:** `py-24` (mobile) to `py-32` (desktop) to ensure massive whitespace and breathability between distinct ideas.
- **Internal Gaps:** `gap-6`, `gap-12`, `gap-16` used strictly within Flex and Grid layouts.

## 4. Animation Specifications (Framer Motion)
- **Scroll Reveal (`<Reveal />`):**
  - Trigger: When element is slightly inside the viewport (`margin: "-80px"`).
  - Animation: `opacity: 0 -> 1`, `y: 28px -> 0px`.
  - Duration: `0.8s`.
  - Ease Curve: Cubic Bezier `[0.22, 1, 0.36, 1]` (Fast out, slow in).
- **Stagger (`<StaggerGroup />`):**
  - Delays children by `0.05s` to `0.07s` sequentially.
- **Marquee:**
  - CSS keyframes translating an element from `translateX(0)` to `translateX(-50%)` infinitely over 20-30 seconds.

## 5. API & Integration Spec
- **Google Fonts API:**
  - Endpoint: `https://fonts.googleapis.com/css2`
  - Parameters Sent: `family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap`
  - Response Expected: CSS file containing `@font-face` declarations.

## 6. Accessibility Standards (A11y)
- **Color Contrast:** All text must pass WCAG AA contrast ratios against both light and dark backgrounds.
- **Semantic HTML:** Use `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`, and `<article>`.
- **Aria Labels:** Icon-only buttons (like the Theme Toggle or Social icons) must have `aria-label` attributes for screen readers.
- **Reduced Motion:** Check system `prefers-reduced-motion` and disable the custom cursor and Framer Motion reveals if true.
