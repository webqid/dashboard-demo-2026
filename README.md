# webqid. dashboard demo

a production-ready demo showcasing modern frontend architecture with next.js app router.

> *frontend, done carefully.*

## overview

this dashboard demonstrates:

- **next.js 16** app router with react server components
- **typescript** in strict mode
- **tailwind css v4** with custom brand theming
- **dark/light theme** with system preference support
- **recharts** for interactive data visualizations
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

| token | light | dark | usage |
|-------|-------|------|-------|
| `--color-background` | `#F9FAFB` | `#0F172A` | page backgrounds |
| `--color-surface` | `#FFFFFF` | `#1E293B` | card/panel surfaces |
| `--color-surface-muted` | `#F1F5F9` | `#334155` | subtle backgrounds |
| `--color-border` | `#E2E8F0` | `#334155` | borders, dividers |
| `--color-text-primary` | `#0F172A` | `#F8FAFC` | headings, primary text |
| `--color-text-secondary` | `#475569` | `#CBD5E1` | body text |
| `--color-text-muted` | `#64748B` | `#94A3B8` | captions, hints |
| `--color-brand` | `#2DD4BF` | `#2DD4BF` | accent, links, focus rings |

use semantic classes like `text-text-primary`, `bg-surface`, `border-border`, and `text-brand`.

### theming

the app supports three theme modes:

- **light** — light backgrounds, dark text
- **dark** — dark backgrounds, light text  
- **system** — automatically follows OS preference

toggle themes via the sun/moon button in the header. preference is persisted to localStorage.

## charts & visualizations

the dashboard includes interactive charts powered by [recharts](https://recharts.org):

- **area chart** — revenue trends over time with gradient fills
- **bar chart** — weekly revenue comparison
- **donut charts** — project status and traffic source distribution

all charts are theme-aware and use the brand color palette.

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
│   │   ├── recharts.tsx    # recharts wrapper components
│   │   ├── charts.tsx      # simple svg charts
│   │   └── ...             # shell, sidebar, topbar, etc.
│   ├── marketing/          # landing page components
│   ├── ui/                 # primitives (button, card, input, etc.)
│   │   └── theme-toggle.tsx # dark/light theme switcher
│   └── states.tsx          # empty, error, loading states
├── lib/
│   ├── data.ts             # mock data with async simulation
│   ├── auth.tsx            # auth context provider
│   ├── theme.tsx           # theme context provider
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

