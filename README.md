# MUMULAB v2

End-to-end Business Builder skeleton, benchmarked to Linear.app design and navigation. This repository contains a static prototype (HTML/CSS/JS) plus product docs (PRD, TRD, Claude.md, Prompt).

## Quick Start

```bash
# Start a simple static server in this folder
python -m http.server 5500
# or
npx http-server -p 5500
```

Open http://localhost:5500/ in your browser.

## Structure
- index.html: Landing with Linear-like header, hover dropdown navigation, docs hub
- style.css: Theme tokens + site shell styles
- mumulab_prd.md: Product Requirements Document
- mumulab_trd.md: Technical Requirements Document
- mumulab_claude_md.md: Assistant behavior & standards
- mumulab_vibe_prompt.md: Cursor Claude Code vibe-coding prompt

## Next Steps
- Migrate this scaffold into Next.js App Router with Tailwind + shadcn/ui
- Implement pages per section and subpages
- Add state, accessibility, and loading/error states per docs

