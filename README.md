# webqid. dashboard demo

a production-ready demo showcasing modern frontend architecture with next.js app router.

> *frontend, done carefully.*

## overview

this dashboard demonstrates:

- **next.js 16** app router with react server components
- **typescript** in strict mode
- **tailwind css** with custom brand theming
- **suspense boundaries** for streaming and loading states
- **server actions** for form handling
- **mock data layer** with simulated latency

## brand design

the webqid. brand is calm and precision-focused. key design elements:

- **accent color**: mint `#2DD4BF`
- **palette**: slate-based neutrals with custom semantic tokens
- **typography**: geist sans + geist mono
- **tone**: lowercase copy, clarity over decoration
- **motion**: restrained (150-250ms), ease-out, respects `prefers-reduced-motion`

### design tokens

colors are defined as css custom properties in `globals.css` using tailwind's `@theme` directive:

| token | value | usage |
|-------|-------|-------|
| `--color-background` | `#F9FAFB` | page backgrounds |
| `--color-surface` | `#FFFFFF` | card/panel surfaces |
| `--color-surface-muted` | `#F1F5F9` | subtle backgrounds |
| `--color-border` | `#E2E8F0` | borders, dividers |
| `--color-text-primary` | `#0F172A` | headings, primary text |
| `--color-text-secondary` | `#475569` | body text |
| `--color-text-muted` | `#64748B` | captions, hints |
| `--color-brand` | `#2DD4BF` | accent, links, focus rings |
| `--color-success` | `#16A34A` | positive indicators |
| `--color-warning` | `#CA8A04` | caution states |
| `--color-error` | `#DC2626` | error states |

use semantic classes like `text-text-primary`, `bg-surface`, `border-border`, and `text-brand`.

## getting started

```bash
# install dependencies
npm install

# run development server
npm run dev
```

open [http://localhost:3000](http://localhost:3000) to view the application.

## project structure

```
src/
├── app/                    # next.js app router pages
│   ├── dashboard/          # dashboard routes with layouts
│   │   ├── projects/       # projects management
│   │   ├── team/           # team management
│   │   └── settings/       # user settings
│   └── page.tsx            # marketing landing page
├── components/
│   ├── dashboard/          # dashboard-specific components
│   ├── marketing/          # landing page components
│   ├── ui/                 # primitives (button, card, input, etc.)
│   └── states.tsx          # empty, error, loading states
├── lib/
│   ├── data.ts             # mock data with async simulation
│   ├── auth.tsx            # auth context provider
│   └── utils.ts            # utility functions
└── types/
    └── index.ts            # typescript interfaces
```

## architecture decisions

- **server components by default** — client components only when needed for interactivity
- **colocation** — page-specific components live near their routes
- **streaming** — suspense boundaries enable progressive loading
- **mock data** — realistic latency simulation without external dependencies

## scripts

```bash
npm run dev      # start development server
npm run build    # production build
npm run start    # start production server
npm run lint     # run eslint
```

## license

mit

