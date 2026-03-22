const config = {
  configuration: {
    pageTitle: "🔭",
    baseUrl: "sleepywndud.github.io",
    description: "NCEA Level 2 and 3 Notes for Mathematics, Statistics, and Calculus.",
    enableDrafts: false,           // kept for compatibility
    ignorePatterns: ["private", "Drafts"],
    enableSPA: true,
    enablePopovers: true,
    locale: "en-US",
    defaultDateType: "modified",

    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
    },

    analytics: {
      provider: "umami",
      host: "https://cloud.umami.is",
      websiteId: "0a44a84e-faa9-4f02-a1c7-23bfc588c4d8",
    },
  },

  plugins: {
    transformers: [
      // default transformers (you can customise later if needed)
    ],
    filters: [
      // RemoveDrafts() is included by default in most setups
    ],
    emitters: [
      // default emitters
    ],
  },
}

export default config