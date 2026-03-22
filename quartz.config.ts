const config = { 
  pageTitle: "sleepy", 
  baseUrl: "sleepywndud.github.io", 
  description: "NCEA Level 2 and 3 Notes for Mathematics, Statistics, and Calculus.", 
  enableDrafts: false, 
  ignorePatterns: ["private", "Drafts"], 
  theme: { 
    typography: { 
      header: "Schibsted Grotesk", 
      body: "Source Sans Pro", 
      code: "IBM Plex Mono" 
    } 
  },
  plugins: {
    transformers: [
      { name: "FrontMatter" }
    ],
    emitters: [
      { name: "HTML" },
      { name: "Static" }
    ]
  }
} 
export default config