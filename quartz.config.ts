const config = {
  pageTitle: "sleepy",
  baseUrl: "sleepywndud.github.io",          // ← no https://, no trailing slash!
  description: "My personal notes and thoughts",
  enableDrafts: false,                       // set true if you want drafts visible
  ignorePatterns: ["private", "templates", "Drafts"],
  theme: {
    typography: {
      header: "Schibsted Grotesk",
      body: "Source Sans Pro",
      code: "IBM Plex Mono"
    },
    colors: {
      light: {
        light: "#fafafa",
        dark: "#222222",
      },
      dark: {
        light: "#111111",
        dark: "#eeeeee",
        // ...
      }
    }
  },
  plugins: {}
}

export default config