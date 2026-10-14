# Abhishek Faltankar — Personal Developer Portfolio

A personal, developer-focused portfolio designed for **Abhishek Faltankar**, an Artificial Intelligence and Data Science undergraduate student (Class of 2027) preparing for software development placements and internships.

The site is built with **React**, **Vite**, **Tailwind CSS**, and **Lucide React**, featuring verified project case studies, an automated GitHub REST API integration with graceful caching and offline fallback, accessible modals, and honest contact and resume workflows.

---

## 🛠️ Technology Stack

- **Core**: React 18, Vite 5, JavaScript (ES6+ with JSX)
- **Styling**: Tailwind CSS (custom dark theme design tokens, fluid typography, no bloated component libraries)
- **Icons**: Lucide React + custom accessible brand SVGs
- **Data Integration**: GitHub REST API (`https://api.github.com/users/abhishekfaltankar/repos`) with client-side localStorage TTL caching
- **Testing**: Vitest + React Testing Library + `@testing-library/jest-dom` (16 unit and component tests)
- **Code Quality**: ESLint with zero warnings/errors
- **Hosting Targets**: Optimized for static hosting on **Vercel** or **Netlify**

---

## 🚀 Quick Start & Prerequisites

### Prerequisites
- **Node.js**: v18.0.0 or later (Tested on Node.js v24.19.0)
- **npm**: v9.0.0 or later (Tested on npm v11.17.0)

### 1. Installation
Clone the repository and install dependencies:
```bash
cd portfolio-web
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Linting
```bash
npm run lint
```

### 4. Run Test Suite
```bash
npm run test
```
Or for interactive test watching:
```bash
npm run test:watch
```

### 5. Build for Production
```bash
npm run build
```
The compiled, production-ready static assets are output to `dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Architecture

```
portfolio-web/
├── index.html                   # HTML entry point, SEO meta tags, Google Fonts preconnect
├── package.json                 # Project dependencies, test configuration, build scripts
├── vite.config.js               # Vite bundler & Vitest test runner setup
├── tailwind.config.js           # Design tokens: palette, typography, radii, focus rings
├── postcss.config.js            # PostCSS configuration
├── .eslintrc.cjs                # ESLint code quality rules
├── .env.example                 # Example environment variables
├── public/
│   ├── favicon.svg              # Geometric typographic monogram favicon ("AF")
│   ├── robots.txt               # Crawler instructions
│   └── resume/                  # Place your compiled resume PDF here
│       └── abhishek-faltankar-resume.pdf
└── src/
    ├── main.jsx                 # React root DOM mounting
    ├── App.jsx                  # Main single-page application orchestrator & skip link
    ├── components/
    │   ├── Header.jsx           # Sticky navigation, active spy, mobile drawer
    │   ├── SectionHeading.jsx   # Standardized technical section header with index
    │   ├── ProjectCard.jsx      # Content-first project card with highlights & links
    │   ├── ProjectModal.jsx     # Deep-dive architecture & forensic case study modal
    │   ├── GitHubProjects.jsx   # Live GitHub REST API feed with caching & retry
    │   ├── ContactSection.jsx   # Direct email, copy-to-clipboard & Formspree form
    │   ├── ResumeModal.jsx      # Resume download verifier & recruiter overview
    │   ├── Footer.jsx           # Minimalist footer with dynamic year & back-to-top
    │   └── Icons.jsx            # Crisp, accessible SVG icons (GitHub, LinkedIn)
    ├── sections/
    │   ├── Hero.jsx             # Asymmetric introduction, availability badge, meta card
    │   ├── About.jsx            # Education narrative, coursework, engineering mindset
    │   ├── Projects.jsx         # 3 Featured projects + GitHub repository section
    │   ├── Skills.jsx           # Categorized technical inventory with context notes
    │   └── Contact.jsx          # Placement inquiry and contact section
    ├── data/
    │   ├── profile.js           # Central candidate profile configuration
    │   ├── projects.js          # Verified project case studies & secondary inventory
    │   └── skills.js            # Categorized skills and tooling
    ├── services/
    │   └── github.js            # GitHub API client, TTL caching, error/rate limit handling
    ├── styles/
    │   └── index.css            # Tailwind directives, CSS variables, scrollbar, focus rings
    └── test/
        ├── setup.js             # Vitest DOM environment setup
        ├── profile.test.js      # Profile configuration validation tests
        ├── projects.test.js     # Featured projects integrity & case study tests
        ├── github.test.js       # GitHub API fallback, rate limit & cache tests
        └── components.test.jsx  # Header, ProjectCard, ResumeModal, Contact tests
```

---

## 🎨 Visual Identity & Design Tokens

The visual system uses a restrained, high-contrast dark theme inspired by modern developer tooling (Linear, Raycast, Supabase):

| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| `base` | `#0C0D0F` | Main application background |
| `base.secondary` | `#121417` | Cards and section containers |
| `base.elevated` | `#181B20` | Interactive surfaces, pills, inputs |
| `content.primary` | `#F1F0EA` | Primary headings and body typography |
| `content.secondary`| `#A0A4AD` | Descriptive copy, captions |
| `content.muted` | `#747985` | Metadata, tags, line numbers |
| `edge` | `#2A2E35` | Thin dividers and card borders |
| `accent` | `#B7F171` | Key interactions, active links, badges (sharp chartreuse) |

### Customizing Design Tokens
- Colors: Edit the `colors` map in `tailwind.config.js` and the CSS variables in `src/styles/index.css`.
- Typography: Body text uses **Plus Jakarta Sans**; technical annotations, metadata, and tags use **JetBrains Mono**. Font imports are defined in `index.html`.

---

## 📝 Customizing Your Information

All personal data, links, projects, and skills are isolated in `src/data/` so you never have to edit JSX to update your profile.

### 1. Personal Profile (`src/data/profile.js`)
Edit this file to update:
- Your name, title, status tagline, and headline.
- Your education timeline, degree, and coursework.
- Your social handles (`github`, `linkedin`).
- Your direct contact email.

### 2. Featured Projects (`src/data/projects.js`)
Contains the three verified projects:
1. **Multimodal Deepfake Detection System** (Flagship: YOLOv8 + fine-tuned ResNet18 6-class classifier, Wav2Vec2 audio exploration, Streamlit dashboard).
2. **FactoryPulse** (Industrial IIoT machine telemetry platform, dual-head Balanced Random Forest, FastAPI backend).
3. **Interactive Date Validation & Age Calculator** (Frontend calendar math, responsive UI, live on Vercel).

To modify a project or swap with another (e.g. Enterprise Retail Platform), simply edit the entries in `featuredProjects`. Each project contains structured fields for problem statement, architecture steps, technical decisions, challenges, and future roadmap.

### 3. Skills Inventory (`src/data/skills.js`)
Organized into 4 categories:
- Programming Languages
- Data, Machine Learning & AI
- Web & Backend Development
- Developer Tools & Workflow

Each skill includes a short `context` note explaining how you applied the tool in real projects (no fake progress bars or percentage scores).

---

## 🌐 GitHub Integration & Rate-Limit Resilience

The portfolio features a live feed from `https://api.github.com/users/abhishekfaltankar/repos`.

### How It Works:
1. **Caching**: Results are cached in `localStorage` for 15 minutes (`CACHE_TTL_MS = 15 * 60 * 1000`). If a visitor refreshes the page within 15 minutes, the site loads instantly without making an external request.
2. **Rate Limit Handling**: Unauthenticated GitHub API calls are subject to GitHub's 60 requests/hour limit. If the rate limit is hit (HTTP 403) or the network is offline, the site **does not crash**; it displays a clean notice (`Cached / Verified Snapshot`) and seamlessly serves verified repository data from `fallbackRepositories` in `src/services/github.js`.
3. **Manual Sync**: Visitors and recruiters can click the **Sync** button at any time to force a fresh pull from the GitHub API.

---

## 📄 Adding Your Resume PDF

1. Compile or export your finalized resume as a PDF file.
2. Name it:
   ```
   abhishek-faltankar-resume.pdf
   ```
3. Place it inside the `public/resume/` directory:
   ```
   portfolio-web/public/resume/abhishek-faltankar-resume.pdf
   ```
4. **Behavior**:
   - If the file exists in `public/resume/`, the Resume button in the header and hero allows direct downloading or opening in a new tab.
   - If the file has not yet been placed there, the site gracefully opens a configuration guide and displays a quick **Candidate Profile Snapshot** (Education, Skills, Projects, and direct contact email) so recruiters always get the necessary information without hitting a broken 404 link.

---

## 📬 Contact Form & Environment Setup

Create a `.env` file in `portfolio-web/` based on `.env.example`:

```bash
cp .env.example .env
```

Set your variables:
```ini
# Direct email address displayed on the portfolio
VITE_CONTACT_EMAIL=your.real.email@example.com

# Optional: Formspree or Formkeep endpoint for external message delivery
# Get a free endpoint at https://formspree.io
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

### Honest Delivery Behavior:
- **When `VITE_FORMSPREE_ENDPOINT` is configured**: The contact form sends the message asynchronously to Formspree, displays real-time loading feedback, validates email syntax and required fields, and confirms successful delivery.
- **When `VITE_FORMSPREE_ENDPOINT` is blank (default)**: The form operates in email-first mode, transparently informing visitors to reach out via the provided `mailto:` link or 1-click clipboard copy, avoiding fake "message sent" illusions.

---

## 🚢 Deployment Guide

The website is a static single-page application (SPA) with zero backend server requirements. It can be deployed in seconds to **Vercel** or **Netlify**.

### Deploying to Vercel (Recommended)
1. Push your code to a GitHub repository:
   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```
2. Log into [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your repository and select the root directory (or `portfolio-web` if monorepo).
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. In **Environment Variables**, add:
   - `VITE_CONTACT_EMAIL` = `your.email@example.com`
   - `VITE_FORMSPREE_ENDPOINT` = `https://formspree.io/f/xyz` (optional)
8. Click **Deploy**.

### Deploying to Netlify
1. Connect your repository on [netlify.com](https://netlify.com).
2. Set Build command to `npm run build` and Publish directory to `dist`.
3. Add environment variables in Site configuration > Environment variables.
4. Click **Deploy Site**.

---

## 🔒 Security & Privacy Practices

- **Zero Client-Side Secrets**: No API keys, personal access tokens, or private secrets are bundled into the client build.
- **XSS Prevention**: All external repository data from GitHub is rendered strictly as sanitized React text nodes, never using `dangerouslySetInnerHTML`.
- **Rel Attributes**: External links use `rel="noopener noreferrer"` to prevent tab-nabbing vulnerabilities.
- **Accessibility**: Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`), keyboard navigation, visible focus indicators, skip-to-content anchor, and ARIA modal focus management.

---

## 👤 Author

**Abhishek Faltankar**  
- **GitHub**: [@abhishekfaltankar](https://github.com/abhishekfaltankar)  
- **Current Education**: B.Tech in Artificial Intelligence & Data Science (Class of 2027)
