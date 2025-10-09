# Dystopia Landing

A modern, privacy-first landing page built with Vite, React, TypeScript, and Tailwind CSS. Features animated components, IndexedDB storage, and one-click data export.

## ✨ Features

### Tech Stack
- ⚡ **Vite** - Lightning fast dev server and builds
- ⚛️ **React 18 + TypeScript** - Type-safe component architecture
- 🎨 **Tailwind CSS** - Utility-first styling with custom theme
- 🎭 **Framer Motion** - Smooth animations (staggered cards, hover lifts, pulsing arrows)
- 🎯 **Lucide Icons** - Beautiful, consistent iconography

### Core Features
- 💾 **IndexedDB Storage** - Client-side waitlist via `idb-keyval`
- 📊 **Data Export** - One-click .xlsx/.csv export via `xlsx`
- 🎊 **Toast System** - Global notifications with context API
- ⚙️ **Config-Driven** - All copy and sections managed from `config.ts`
- 🧪 **Tested** - Vitest suite with 28 passing tests
- ♿ **Accessible** - ARIA labels, semantic HTML, keyboard navigation

### UI Components
- 🦸 **Hero** - Two-column layout with image showcase
- 🔒 **Feature Grid** - Privacy-first messaging with gradient cards
- 🌀 **Washer Showcase** - Animated circular drum with rising bubbles
- 📋 **Tasks Gallery** - 12 filterable task cards with clipboard copy
- 👥 **Persona Grid** - 9 user personas with emoji icons
- 🔄 **Under the Hood** - Privacy architecture flow diagram
- 📧 **Waitlist Form** - Full-featured with validation and admin panel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment to GitHub Pages

### One-Time Setup

1. **Update `vite.config.ts`** with your repo name:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
   ```

2. **Update `index.html`** with your GitHub username:
   ```html
   <meta property="og:url" content="https://yourusername.github.io/your-repo-name/" />
   ```

3. **Create GitHub repository** (if not already created):
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit"
   gh repo create yourusername/your-repo-name --public --source=. --remote=origin --push
   ```

### Deploy

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

### Continuous Deployment

Every time you want to update the live site:

```bash
git add .
git commit -m "your commit message"
git push
npm run deploy
```

## Project Structure

```
dystopia-landing/
├── src/
│   ├── components/
│   │   ├── layout/       # Shell, Footer
│   │   ├── hero/         # Hero section
│   │   ├── features/     # Feature grid
│   │   ├── washer/       # Washer showcase
│   │   ├── tasks/        # Tasks gallery
│   │   ├── personas/     # Persona grid
│   │   ├── flow/         # Under the hood flow
│   │   ├── waitlist/     # Waitlist form
│   │   └── ui/           # Badge, Button, Card
│   ├── lib/
│   │   ├── db.ts         # IndexedDB helpers
│   │   ├── export.ts     # XLSX/CSV export
│   │   └── config.ts     # Site configuration
│   └── styles/
│       └── globals.css   # Global styles
├── public/               # Static assets
└── ...config files
```

## Configuration

### Base Path for GitHub Pages

Edit `vite.config.ts` to set your repository name:

```ts
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

### Site Content

Edit `src/lib/config.ts` to customize all text content, features, and sections.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Storage:** idb-keyval (IndexedDB wrapper)
- **Export:** xlsx (Excel/CSV export)
- **Deployment:** gh-pages

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run deploy` - Deploy to GitHub Pages

## License

MIT

