# Project Structure

```
x-profiler/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── analyze/          # Profile analysis endpoint
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
│
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── analysis-results.tsx
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── profile-analyzer.tsx
│   └── ...
│
├── lib/                      # Utility libraries
│   ├── config/               # Configuration modules
│   │   └── api-config.ts
│   ├── services/             # External service integrations
│   │   ├── x-api.ts
│   │   └── gemini-api.ts
│   ├── types.ts              # TypeScript definitions
│   └── utils.ts              # Utility functions
│
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md
│   ├── HOW-TO.md
│   └── LIMITATIONS.md
│
├── screenshots/              # Application screenshots
│   └── homepage.png
│
├── public/                   # Static assets
│
├── .env.local.example        # Environment variables template
├── .gitignore                # Git ignore rules
├── CHANGELOG.md              # Version history
├── README.md                 # Project documentation
├── SECURITY.md               # Security policies
├── start.sh                  # Quick start script
│
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.mjs        # PostCSS configuration
├── middleware.ts             # Next.js middleware (security headers)
├── components.json           # shadcn/ui configuration
├── package.json              # NPM dependencies
└── package-lock.json         # NPM lock file
```

## Key Directories

### `/app`
Next.js 15 App Router directory containing pages and API routes.

### `/components`
All React components, including shadcn/ui components in the `ui/` subdirectory.

### `/lib`
Business logic, service integrations, and utility functions.

### `/docs`
Comprehensive documentation for architecture, usage, and limitations.

## Configuration Files (Root Level)

These files must remain in the root directory for Next.js to function properly:

- **next.config.ts** - Next.js configuration
- **tsconfig.json** - TypeScript settings
- **tailwind.config.ts** - Tailwind CSS configuration
- **postcss.config.mjs** - PostCSS for CSS processing
- **middleware.ts** - Security headers middleware
- **components.json** - shadcn/ui component registry