# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Quartz v4.5.2** digital garden deployment - a static site generator for publishing markdown-based notes as a website. The repository hosts a personal note/blog site called "Melon Notes" hosted at `melon.blakehoerres.com` with a Gruvbox Material theme applied.

## Common Commands

### Development & Building
- `npm run quartz build` - Build the site to a `public/` directory
- `npm run quartz build --serve` - Build and serve locally with hot reload on `http://localhost:3000`
- `npm run docs` - Build docs specifically (builds to `docs/` directory and serves)
- `npm test` - Run TypeScript tests (uses tsx --test)
- `npm run check` - Type-check with TypeScript and format-check with Prettier
- `npm run format` - Auto-format all code with Prettier
- `npm run profile` - Profile build performance with 0x

## Architecture Overview

### Core Build Pipeline
The build process is defined by a plugin-based architecture:

1. **Parsing** (`quartz/processors/parse.ts`) - Convert markdown files to AST using `remark`
2. **Filtering** (`quartz/processors/filter.ts`) - Apply filters (e.g., draft removal via `RemoveDrafts()`)
3. **Transformation** (`quartz/processors/transform.ts`) - Apply transformer plugins to process AST
4. **Emission** (`quartz/processors/emit.ts`) - Generate output files (HTML, JSON, etc.)

### Plugin System
- **Transformers** (`quartz/plugins/transformers/`) - Process markdown AST before HTML conversion
  - Handle syntax highlighting, LaTeX, links, frontmatter, GFM, OFM, etc.
  - Each transformer modifies the MDAST or metadata
- **Filters** (`quartz/plugins/filters/`) - Exclude files from processing (e.g., drafts)
- **Emitters** (`quartz/plugins/emitters/`) - Generate output files
  - `ContentPage()` - Main article pages
  - `FolderPage()` - Directory index pages
  - `TagPage()` - Tag listing pages
  - `NotFoundPage()` - 404 page
  - `ContentIndex()` - Full-text search index (JSON)
  - `Static()` - Copy static assets
  - `ComponentResources()` - Generate component CSS/JS bundles

### Markdown Processing Pipeline
- **Unified ecosystem** - Uses `remark` (markdown parser) → `rehype` (HTML processor)
- **Key transformers in config**:
  - `FrontMatter()` - Parse YAML frontmatter
  - `SyntaxHighlighting()` - Code syntax coloring via Shiki
  - `ObsidianFlavoredMarkdown()` - Support `[[wiki-links]]` and embeds
  - `GitHubFlavoredMarkdown()` - Tables, strikethrough, etc.
  - `TableOfContents()` - Generate heading TOC
  - `CrawlLinks()` - Process internal/external links
  - `Latex()` - Render KaTeX math

### Components & Client Scripts
- **Components** (`quartz/components/`) - Preact components rendered to HTML
- **Scripts** (`quartz/components/scripts/`) - Inline browser scripts for interactivity
  - `darkmode.inline.ts` - Theme switching
  - `search.inline.ts` - Full-text search UI
  - `explorer.inline.ts` - File tree sidebar
  - `graph.inline.ts` - Interactive dependency graph (D3/PixiJS)
  - `spa.inline.ts` - SPA client-side routing with Micromorph
  - Other utilities: popover, toc, comments, clipboard, etc.

### Configuration
- `quartz.config.ts` - Main config file defining:
  - Site metadata (title, base URL, locale)
  - Theme (colors, typography - currently Gruvbox Material)
  - Plugin pipeline (transformers, filters, emitters)
  - Feature toggles (SPA, popovers, analytics)
  - Content ignore patterns (`private/`, `templates/`, `.obsidian/`)

## Content Structure

- `content/` - Markdown source files (published notes)
- `private/` - Private notes (ignored by build)
- `templates/` - Markdown templates (ignored by build)
- `.obsidian/` - Obsidian vault config (ignored by build)

## Key Technologies

- **Unified/Remark/Rehype** - Markdown parsing and HTML generation
- **Preact** - Lightweight UI framework for components
- **Shiki** - Syntax highlighting
- **D3 + PixiJS** - Graph visualizations
- **Micromorph** - SPA morphing library
- **TypeScript** - Codebase language (Node 22+, npm 10.9.2+)

## Theme Customization

The Gruvbox Material theme is applied via `quartz.config.ts` color configuration. Modify the `theme.colors` section to adjust:
- Light mode: `#f9f5d7` background, `#a9b665` secondary accent
- Dark mode: `#282828` background, `#a9b665` secondary accent
