import fs from "fs"
import path from "path"
// @ts-ignore
import script from "./scripts/announcements.inline"
import style from "./styles/announcements.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, simplifySlug, type FullSlug } from "../util/path"

// Loudspeaker button for the homepage top bar, next to the dark mode toggle.
// Clicking it opens the inbox; clicking a message in the inbox opens it as a popup.
//
// Written in content/announcements.md (a draft, so it is never a page of its own):
//
//   ## YYYY-MM-DD  The headline shown in the inbox
//   until: YYYY-MM-DD        (optional) hides it after that day
//
//   The message body, until the next "## ". Paragraphs, - bullet lists,
//   **bold**, *italic*, `code` and [links](Past-Papers.md) all work.

const SOURCE = path.join("content", "announcements.md")
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

interface Announcement {
  date: string
  title: string
  until?: string
  body: string
}

function parse(markdown: string): Announcement[] {
  const text = markdown
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "") // frontmatter
    .replace(/%%[\s\S]*?%%/g, "") // Obsidian comments: the notes to self at the top
  const out: Announcement[] = []
  for (const line of text.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(\d{4}-\d{2}-\d{2})\s+(.*\S)\s*$/)
    if (heading) {
      out.push({ date: heading[1], title: heading[2], body: "" })
      continue
    }
    const current = out[out.length - 1]
    if (!current) continue
    const until = line.trim().match(/^until:\s*(\d{4}-\d{2}-\d{2})$/i)
    if (until && current.body.trim() === "") current.until = until[1]
    else current.body += line + "\n"
  }
  return out.map((a) => ({ ...a, body: a.body.trim() }))
}

// "2026-11-08" -> "8 Nov". Parsed by hand so the date never shifts with the server's timezone.
function shortDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return y && m && d ? `${d} ${MONTHS[m - 1]}` : iso
}

const INLINE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g

const plain = (text: string) =>
  text.replace(INLINE, (_m, a, _href, b, c, d) => a ?? b ?? c ?? d ?? "").trim()

const Announcements: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  let items: Announcement[] = []
  try {
    items = parse(fs.readFileSync(SOURCE, "utf8"))
  } catch {
    return null // no announcements file, no button
  }
  if (items.length === 0) return null
  const slug = fileData.slug!

  const link = (href: string) =>
    /^(https?:)?\/\/|^(mailto|tel):/.test(href)
      ? href
      : resolveRelative(slug, simplifySlug(href.replace(/\.md(#.*)?$/, "$1") as FullSlug))

  // Markdown links, bold, italics and code inside a line.
  const inline = (text: string) => {
    const nodes: (string | JSX.Element)[] = []
    let last = 0
    for (const m of text.matchAll(INLINE)) {
      if (m.index! > last) nodes.push(text.slice(last, m.index))
      if (m[1] !== undefined) nodes.push(<a href={link(m[2])}>{m[1]}</a>)
      else if (m[3] !== undefined) nodes.push(<strong>{m[3]}</strong>)
      else if (m[4] !== undefined) nodes.push(<em>{m[4]}</em>)
      else nodes.push(<code>{m[5]}</code>)
      last = m.index! + m[0].length
    }
    if (last < text.length) nodes.push(text.slice(last))
    return nodes
  }

  // Blank-line separated blocks: a block of "- " lines is a list, anything else a paragraph.
  const blocks = (body: string) =>
    body
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block) => {
        const lines = block.split("\n").map((l) => l.trim())
        if (lines.every((l) => /^[-*]\s+/.test(l))) {
          return (
            <ul>
              {lines.map((l) => (
                <li>{inline(l.replace(/^[-*]\s+/, ""))}</li>
              ))}
            </ul>
          )
        }
        return <p>{inline(lines.join(" "))}</p>
      })

  const firstParagraph = (body: string) =>
    plain(body.split(/\n\s*\n/).find((b) => !/^\s*[-*]\s+/.test(b.trim())) ?? "").replace(
      /\s+/g,
      " ",
    )

  return (
    <div class="announce">
      <button
        class="announce-btn"
        aria-expanded="false"
        aria-controls="announce-inbox"
        title="Announcements"
      >
        <span class="announce-sr">Announcements</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.4 3.1a1 1 0 0 0-1 .1L9.7 9H5.5A2.5 2.5 0 0 0 3 11.5v1A2.5 2.5 0 0 0 5.5 15h.6l1.1 4.8a1.2 1.2 0 0 0 1.2.9h1.4a1.2 1.2 0 0 0 1.2-1.5L10.1 15l8.3 5.8a1 1 0 0 0 1.6-.8V4a1 1 0 0 0-.6-.9ZM8.2 15h.7l.9 4h-.7l-.9-4Z" />
        </svg>
        <span class="announce-badge" hidden>
          0
        </span>
      </button>

      <div class="announce-inbox" id="announce-inbox" hidden>
        <div class="announce-inbox-head">
          <span>Announcements</span>
          <button class="announce-readall" type="button">
            mark all read
          </button>
        </div>
        <ul class="announce-list">
          {items.map((a) => (
            <li
              class="announce-item"
              data-id={`${a.date}|${plain(a.title)}`}
              data-until={a.until ?? ""}
            >
              <button class="announce-trigger" type="button">
                <span class="announce-dot" aria-hidden="true"></span>
                <span class="announce-row">
                  <span class="announce-date">{shortDate(a.date)}</span>
                  <span class="announce-title">{plain(a.title)}</span>
                  <span class="announce-preview">{firstParagraph(a.body)}</span>
                </span>
              </button>
              <template class="announce-body">{blocks(a.body)}</template>
            </li>
          ))}
        </ul>
        <p class="announce-empty" hidden>
          Nothing new right now.
        </p>
      </div>

      <div class="announce-backdrop" hidden>
        <div class="announce-msg" role="dialog" aria-modal="true" aria-labelledby="announce-msg-title">
          <div class="announce-msg-head">
            <div>
              <p class="announce-msg-date"></p>
              <h2 class="announce-msg-title" id="announce-msg-title"></h2>
            </div>
            <button class="announce-close" type="button" title="Close">
              <span class="announce-sr">Close</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div class="announce-msg-body"></div>
        </div>
      </div>
    </div>
  )
}

Announcements.afterDOMLoaded = script
Announcements.css = style

export default (() => Announcements) satisfies QuartzComponentConstructor
