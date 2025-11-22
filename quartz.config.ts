import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration - Customized with Gruvbox theme
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Melon Notes",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "melon.blakehoerres.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "JetBrains Mono",
        body: "Fira Code",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#fbf1c7",
          lightgray: "#e8dcc1",
          gray: "#d5c4a1",
          darkgray: "#654321",
          dark: "#3c3836",
          secondary: "#b8860b",
          tertiary: "#8b4513",
          highlight: "rgba(184, 134, 11, 0.15)",
          textHighlight: "#ffd70088",
        },
        darkMode: {
          light: "#282828",
          lightgray: "#3c3836",
          gray: "#504945",
          darkgray: "#ebdbb2",
          dark: "#fbf1c7",
          secondary: "#8ec07c",
          tertiary: "#fe8019",
          highlight: "rgba(142, 192, 124, 0.15)",
          textHighlight: "#b8bb2688",
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
