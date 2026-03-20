# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication

- **Always respond in Chinese (中文回复)**

## Project Overview

Multi-app legal documentation site (隐私政策、用户协议等) built with Next.js 16 (App Router), supporting MDX content rendering with dark mode and static generation.

## Commands

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Vitest tests (watch mode)
- `npm run test:run` - Run Vitest tests once

## Project Structure

```
app/               # Next.js App Router pages
  (docs)/          # Route group for documentation pages
    layout.tsx     # Docs shared layout (min-h-screen flex)
    page.tsx       # Home: app card grid
    [app]/
      layout.tsx   # App layout (Header + params validation)
      page.tsx     # App detail: doc list
      [...slug]/
        page.tsx   # MDX doc renderer (prose layout)
  layout.tsx       # Root layout (ThemeProvider, html lang="zh-CN")
  globals.css      # Tailwind v4 imports + CSS variables
  not-found.tsx    # 404 page

components/        # React components
  Header.tsx       # Navigation header
  Footer.tsx       # Footer
  AppCard.tsx      # Home page app cards
  ThemeToggle.tsx  # Dark mode toggle
  ThemeProvider.tsx # Theme context provider
  AppFooter.tsx    # App-specific footer with download links
lib/
  docs.ts          # Content utilities (getApps, getApp, getDocs, getDoc, getDocPaths)
  config.ts        # Site-wide config and AppFooter types
  utils.ts         # cn() utility using clsx + tailwind-merge

content/           # MDX documents + app metadata
  apps.json        # App registry (id, name, description, icon, optional footer config)
  {appId}/         # Per-app content
    *.mdx          # Legal docs (privacy.mdx, terms.mdx, etc.) — export metadata
```

## Architecture

### Routing
- `/` → home page listing all apps
- `/:appId` → app detail page listing its docs
- `/:appId/:slug` → MDX doc rendered with `@tailwindcss/typography` prose styles

### Content System
- Apps are defined in `content/apps.json`
- Legal docs: MDX files export `metadata` with `title` and `description`
- `lib/docs.ts` uses React `cache()` for deduplication, reads apps.json and dynamically imports MDX modules
- `generateStaticParams()` in doc routes pre-builds all app+doc paths at build time

### MDX Rendering
- Configured via `@next/mdx` in `next.config.ts`
- `mdx-components.tsx` provides custom component overrides (h1-h3, p, a, ul, ol, code, pre, blockquote)
- `@tailwindcss/typography` plugin provides prose styling with `dark:prose-invert`

### Theme
- `next-themes` with `'use client'` ThemeProvider in root layout
- Dark mode via `dark:` Tailwind variants, `class` attribute strategy
- `ThemeToggle` component handles mount-safe client-side switching

### Config
- `lib/config.ts` exports `siteFooter` (copyright, contact, ICP) and `AppFooterConfig`/`AppMeta` types
- `AppFooterConfig` is re-exported from `docs.ts` as `AppMeta`

## Tech Stack

- Next.js 16 + React 19 (App Router, SSG)
- Tailwind CSS v4 (`@tailwindcss/postcss`, `@tailwindcss/typography`)
- MDX via `@next/mdx` + `@mdx-js/loader`
- `next-themes` for dark mode
- `clsx` + `tailwind-merge` for className merging
- Vitest for unit testing

## Active Technologies
- TypeScript / Next.js 16 + React 19 + `@next/mdx`, `@tailwindcss/typography`, `next-themes` (002-project-card-mdx)

## Recent Changes
- 002-project-card-mdx: Added TypeScript / Next.js 16 + React 19 + `@next/mdx`, `@tailwindcss/typography`, `next-themes`
