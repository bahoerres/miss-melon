import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration - Obsidian Material Gruvbox Theme
 * Based on Material Gruvbox theme + blank-river-headers snippet
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Best Melon Project",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "melon.blakehoerres.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "BioRhyme",
        body: "Inter",
        code: "Space Mono",
      },
      colors: {
        lightMode: {
          light: "#f9f5d7",
          lightgray: "#d5c4a1",
          gray: "#928374",
          darkgray: "#654735",
          dark: "#3c3836",
          secondary: "#a9b665",
          tertiary: "#e78a4e",
          highlight: "rgba(169, 182, 101, 0.15)",
          textHighlight: "rgba(231, 138, 78, 0.3)",
        },
        darkMode: {
          light: "#282828",
          lightgray: "#504945",
          gray: "#928374",
          darkgray: "#d4be98",
          dark: "#fbf1c7",
          secondary: "#a9b665",
          tertiary: "#e78a4e",
          highlight: "rgba(169, 182, 101, 0.15)",
          textHighlight: "rgba(231, 138, 78, 0.3)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.NotFoundPage(),
      Plugin.Static(),
      Plugin.ContentIndex(),
    ],
  },
}

export default config
