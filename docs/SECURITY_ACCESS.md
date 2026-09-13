# Security & Access Document

## 1. Authentication & Authorization
**Current State:** There is NO authentication system in this application. 
**Reasoning:** This is a fully static portfolio website intended entirely for public consumption. There is no user-generated content, no private user data, and no backend database that requires protection. 
**User Roles:** 
- **Public Visitor:** Can view all pages, toggle dark mode, click outbound links, and trigger a mailto link. They cannot modify data.
**Future State:** If a Content Management System (CMS) like Sanity or Strapi is added later to manage projects, authentication will be handled entirely by that third-party service's dashboard. The frontend will only consume the public read-only API via an API key scoped exclusively for "Read" access.

## 2. Client-Side Security

### XSS (Cross-Site Scripting)
The primary vector for XSS in React applications is the misuse of `dangerouslySetInnerHTML`.
- **Current Usage:** This project utilizes `dangerouslySetInnerHTML` inside `skills.tsx` (or a utility function) to parse raw SVG strings imported directly from the local filesystem via Vite's `?raw` import.
- **Risk Assessment:** Low/Zero. Because the SVG strings are hardcoded into the repository by the developer and not provided by user input, there is no way for a malicious user to inject `<script>` tags into the SVG rendering pipeline.
- **Rule:** Never use `dangerouslySetInnerHTML` with data fetched from an untrusted third-party API or user input.

### Dependencies
- **Risk:** Malicious or vulnerable npm packages.
- **Mitigation:** Rely on established libraries (React, Vite, Tailwind, Framer Motion). Run `npm audit` periodically.

## 3. Data Protection & Privacy

- **Client-Side Data:** All data in `data.ts` is shipped to the client's browser. Do not place any sensitive information (API keys, personal phone numbers, physical addresses) in `data.ts`.
- **Email Protection:** The contact method relies on a `mailto:` link. This exposes the email address to basic web scrapers. 
  - *Future consideration:* Implement an obfuscation script or a backend form submission (e.g., Formspree, Resend) to hide the email address from spam bots.
- **GDPR / Tracking:** The site currently has zero tracking scripts, cookies (other than a `localStorage` key for theme preference), or analytics. No cookie banner is required at this time.

## 4. Error Handling Guide

- **404 Routes:** If a user navigates to a non-existent route, React Router will render a blank page unless a fallback `<Route path="*">` is provided. 
  - *Action Required:* Ensure a "404 Not Found" component is wired up to the wildcard route to gracefully guide users back to the homepage.
- **Broken Images:** If an image path in `data.ts` is incorrect, the browser will render a broken image icon. 
  - *Action Required:* Ensure the `img` tags have fallback logic or descriptive `alt` tags.
- **JavaScript Errors:** A fatal JS error will crash the React tree, resulting in a blank white screen. 
  - *Action Required:* Wrap the main `<App />` component in an Error Boundary to display a generic "Something went wrong" UI if an unexpected exception occurs.

## 5. Edge Cases to Handle Before Launch

1. **Local Storage Failure:** If a user has strict privacy settings blocking `localStorage`, the theme toggle will fail. Wrap the `localStorage.setItem` and `getItem` calls in `try/catch` blocks.
2. **Mobile Viewport Height:** Mobile browsers have dynamic address bars that change the true viewport height (`vh`). Avoid using `100vh` for the Hero section; use `100svh` (Small Viewport Height) or Tailwind's `min-h-screen` which accounts for this.
3. **Motion Sensitivity:** Users with vestibular disorders may experience motion sickness from the custom cursor, scroll reveals, and infinite marquee. 
  - *Action:* Utilize the CSS media query `@media (prefers-reduced-motion: reduce)` to disable Framer Motion animations and hide the custom cursor for these users.

## 6. Deployment Security
- Ensure the static hosting provider (Vercel/Netlify) enforces **HTTPS** out of the box.
- Configure basic security headers in the hosting config (e.g., `X-Frame-Options: DENY` to prevent clickjacking).
