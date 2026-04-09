# Karpagapriya A — Portfolio

Production-grade portfolio built with Next.js 14, TypeScript, Tailwind CSS, GSAP, Lenis, and Framer Motion.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Micro-interactions**: Framer Motion (ready to use)
- **Theme**: next-themes (dark default)
- **Fonts**: Syne · DM Sans · DM Mono

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css         # CSS variables, base styles
│   ├── layout.tsx          # Root layout — fonts, providers
│   └── page.tsx            # Main page — all sections assembled
└── components/
    ├── providers/
    │   ├── ThemeProvider.tsx
    │   └── LenisProvider.tsx
    ├── sections/
    │   ├── Hero.tsx
    │   ├── About.tsx
    │   ├── Skills.tsx
    │   ├── Experience.tsx
    │   ├── Projects.tsx
    │   ├── Certifications.tsx
    │   ├── Education.tsx
    │   └── Contact.tsx
    └── ui/
        ├── CustomCursor.tsx
        ├── Navbar.tsx
        ├── ThemeToggle.tsx
        └── Footer.tsx
```

## Customisation

- **Colors**: Edit CSS variables in `globals.css` (`:root` and `.dark`)
- **Content**: All content is inline in each section component
- **Resume**: Drop your PDF as `public/resume.pdf`
- **Cert Links**: Update `href` in `Certifications.tsx`
- **Project Links**: Update `live` and `github` in `Projects.tsx`

## Deploying to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).
