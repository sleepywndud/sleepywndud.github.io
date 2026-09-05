import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

// Base color
const SECONDARY_DARK = "#5865f2"

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      default:
        h = (r - g) / d + 4
    }
    h *= 60
  }
  return [h, s * 100, l * 100]
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0")
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

const [baseH, baseS, baseL] = hexToHsl(SECONDARY_DARK)

// Light mode secondary: same hue, deepened/saturated so it reads on a white background.
const SECONDARY_LIGHT = hslToHex(baseH, Math.min(baseS + 25, 100), Math.max(baseL - 20, 10))

// Tertiary: secondary lightened, same hue/saturation, per mode.
const TERTIARY_DARK = hslToHex(baseH, baseS, Math.min(baseL + 20, 90))
const [lightH, lightS, lightL] = hexToHsl(SECONDARY_LIGHT)
const TERTIARY_LIGHT = hslToHex(lightH, lightS, Math.min(lightL + 20, 90))

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🫵🧠2️⃣💩",
    // pageTitle: "NBTS ・▾・",
    // pageTitle: ">⩊<.ᐟ",
    // pageTitle: "˖ ݁♬⋆.˚𝄞",
    // pageTitle: "\\(^o^)/",
    pageTitleSuffix: " ㅣ Ni Brain Too Sht",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "umami",
      websiteId: "0a44a84e-faa9-4f02-a1c7-23bfc588c4d8",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "local",
      cdnCaching: true,
      typography: {
        header: "CMU Serif",
        body: "CMU Serif",
        title: "CMU Serif",
        code: "IBM Plex Mono",
      },
      colors: {
        // lightMode: {
        //   light: "#ffffff",
        //   lightgray: "#e8e8e8",
        //   gray: "#888888",
        //   darkgray: "#2e2e2e",
        //   dark: "#141414",
        //   secondary: SECONDARY_LIGHT,
        //   tertiary: TERTIARY_LIGHT,
        //   highlight: `${SECONDARY_LIGHT}22`,
        //   textHighlight: `${SECONDARY_LIGHT}33`,
        // },
        lightMode: {
          light: "#ff0000",
          lightgray: "#0000ff",
          gray: "#00ff00",
          darkgray: "#0000ff",
          dark: "#0000ff",
          secondary: "#00ff00",
          tertiary: "#00ff00",
          highlight: "#00ff00",
          textHighlight: "#00ff00",
        },
        darkMode: {
          light: "#000",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: SECONDARY_DARK,
          tertiary: TERTIARY_DARK,
          highlight: `${SECONDARY_DARK}33`,
          textHighlight: `${SECONDARY_DARK}22`,
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
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
