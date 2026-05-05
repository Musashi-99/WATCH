# AGENTS.md

## Commands

- `npm run dev` — Start dev server (http://localhost:5173)
- `npm run build` — Build to `dist/`
- `npm run preview` — Preview production build locally

## Project Structure

- Entry point: `index.html` → `main.js`
- Secondary page: `watch-detail.html` → `watch-detail.js`
- Styles: `style.css`

## Dependencies

- **GSAP** — Animations (registered ScrollTrigger in main.js)
- **Lenis** — Smooth scroll (instantiated in main.js)

## Notes

- No build config file — Vite uses defaults (no `vite.config.js`)
- No tests, no TypeScript
- No lint/typecheck commands
- `.gitignore` excludes: `node_modules/`, `*.avif`, `*.png`, `.DS_Store`, `Untitled.mp4`

## Build Output

- Production files go to `dist/` directory