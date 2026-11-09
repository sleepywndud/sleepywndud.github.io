// Checks the built site in public/ for two things:
//
// 1. Page/folder collisions. A note at content/X.md is emitted to X.html and is
//    served at /X, with every link in it written relative to /. Put ANY markdown
//    file inside content/X/ and Quartz also emits a folder page at X/index.html —
//    which renders the same note body but is served at /X/. GitHub Pages answers
//    both URLs, so from /X/ every relative link gains an extra X/ and 404s
//    (e.g. /Past-Papers/Past-Papers/Scholarship/Assessment/2025.pdf). Keep notes
//    out of a folder that shares a name with a note.
//
// 2. Internal links that point at nothing.
//
// Run after `npx quartz build`:  node scripts/check-links.mjs
// Exits non-zero if anything is wrong, so it can gate a deploy.

import fs from "node:fs"
import path from "node:path"

const ROOT = process.argv[2] ?? "public"

if (!fs.existsSync(ROOT)) {
  console.error(`No ${ROOT}/ — run \`npx quartz build\` first.`)
  process.exit(2)
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

const files = walk(ROOT)
const urls = files.map((f) => "/" + path.relative(ROOT, f).split(path.sep).join("/"))
const exists = new Set(urls)

// ---------- 1. page/folder collisions ----------

const collisions = urls
  .filter((u) => u.endsWith("/index.html"))
  .map((u) => u.slice(0, -"/index.html".length))
  .filter((base) => exists.has(base + ".html"))

// ---------- 2. dead internal links ----------

function servedBy(pathname) {
  const p = decodeURIComponent(pathname)
  return (
    exists.has(p) ||
    exists.has(p + ".html") ||
    exists.has((p.endsWith("/") ? p : p + "/") + "index.html")
  )
}

const pages = files.filter((f) => f.endsWith(".html"))
const broken = []
let checked = 0

for (const file of pages) {
  const rel = "/" + path.relative(ROOT, file).split(path.sep).join("/")
  // X/index.html is served at /X/ ; X.html is served at /X
  const pageUrl = rel.endsWith("/index.html")
    ? rel.slice(0, -"index.html".length)
    : rel.slice(0, -".html".length)
  const html = fs.readFileSync(file, "utf8")
  const seen = new Set()
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = match[1]
    if (seen.has(raw)) continue
    seen.add(raw)
    if (/^(https?:|mailto:|data:|javascript:|#|\/\/)/i.test(raw)) continue
    let url
    try {
      url = new URL(raw, "https://site" + pageUrl)
    } catch {
      continue
    }
    if (url.origin !== "https://site") continue
    checked++
    if (!servedBy(url.pathname)) broken.push({ page: pageUrl, raw, resolved: url.pathname })
  }
}

// ---------- report ----------

console.log(`${pages.length} pages, ${checked} internal links checked`)

if (collisions.length) {
  console.log(`\n✗ ${collisions.length} page/folder collision(s) — links on these pages double up:`)
  for (const base of collisions) {
    console.log(`   ${base}.html  and  ${base}/index.html`)
    console.log(`     move the markdown out of content${base}/ , or rename it`)
  }
}

if (broken.length) {
  const byPage = new Map()
  for (const b of broken) byPage.set(b.page, [...(byPage.get(b.page) ?? []), b])
  console.log(`\n✗ ${broken.length} dead link(s):`)
  for (const [page, list] of [...byPage].sort()) {
    console.log(`   ${page}`)
    for (const b of list) console.log(`      ${b.raw}  ->  ${b.resolved}`)
  }
}

if (!collisions.length && !broken.length) {
  console.log("\n✓ no collisions, no dead links")
}

process.exit(collisions.length || broken.length ? 1 : 0)
