const config = {
  pageTitle: "🔭",
  baseUrl: "sleepywndud.github.io",
  description: "NCEA Level 2 and 3 Notes for Mathematics, Statistics, and Calculus.",
  enableDrafts: false,
  ignorePatterns: ["private", "Drafts"],

  theme: {
    typography: {
      header: "Schibsted Grotesk",
      body: "Source Sans Pro",
      code: "IBM Plex Mono",
    },
  },

  configuration: {
    analytics: {
      provider: "umami",
      host: "https://cloud.umami.is",
      websiteId: "0a44a84e-faa9-4f02-a1c7-23bfc588c4d8",
    },
  },
}

export default config