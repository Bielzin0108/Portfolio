# Gabriel Cavalcante Sobreira | Portfolio

Professional fullstack portfolio built with React, Vite, TypeScript, TailwindCSS, Framer Motion, React Router DOM, i18next, EmailJS, Lenis Scroll, Lucide Icons and shadcn-style local UI components.

## Stack

- React + Vite + TypeScript
- TailwindCSS with design tokens
- Framer Motion and React Intersection Observer
- React Type Animation
- React Router DOM
- i18next with Portuguese, English and Spanish
- EmailJS with `mailto` fallback
- Lenis smooth scrolling
- React Helmet Async for SEO
- Lucide React Icons
- Local shadcn-style UI primitives

## Architecture

```txt
src/
  components/
    cards/
    common/
    forms/
    layouts/
    ui/
  data/
  hooks/
  lib/
  pages/
  sections/
  services/
  styles/
  translations/
  types/
```

## Local Development

```bash
npm install
npm run dev
```

The app runs at `http://127.0.0.1:5173`.

## EmailJS

Create `.env.local` from `.env.example`:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Without these variables, the contact form keeps the user flow working and opens the default email client with the message prefilled.

## Education

The portfolio displays the completed higher education degree in Systems Analysis and Development at Centro Universitário SENAC. The diploma is available at `public/Diploma.pdf` and is linked from the About section.

## Localized PDF Resume

The resume download button follows the active i18next language and returns PDF files only:

- Portuguese: `public/GabrielCavalcante_CV_PTBR.pdf`
- English: `public/GabrielCavalcante_CV_EN.pdf`
- Spanish: `public/GabrielCavalcante_CV_ES.pdf`

## Project Images

Project cards use original raster images, without SVG conversion:

- `public/assets/projects/bartie.png`
- `public/assets/projects/portuguesa.png`
- `public/assets/projects/banespa.png`
- `public/assets/projects/pokebola.png`
- `public/assets/projects/burguer.png`
- `public/assets/projects/air-planning.png`

Keep these names or update `src/data/portfolio.ts`.

## Deployment

Vercel settings:

- Framework: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Future Improvements

- Connect real GitHub statistics through the GitHub API.
- Add automated tests with Vitest and Playwright.
- Configure a custom domain and analytics.
- Replace mock GitHub contribution data with live data.
