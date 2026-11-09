// Random L3 excellence question picker.
//
// The three collated PDFs (91577 / 91578 / 91579) hold one question per page,
// the rest of the page being ruled answer space. data/l3excellence.ts says which
// slice of which page each question lives on, so pdf.js can draw the question on
// its own. Nothing but the PDFs already on the site is needed.
//
// It draws into the notes column, so the WBTS pad splits the screen beside it.

import { MAX_CANVAS_PIXELS, loadPdfjs } from "./pdfjs"
import { TOPICS, type Question, type Topic } from "../data/l3excellence"
import { getFullSlug, pathToRoot } from "../../util/path"

const SEEN_KEY = "randomq-seen"
const TOPICS_KEY = "randomq-topics"

const id = (t: Topic, q: Question) => `${t.key}:${q.year}:${q.n}`

// ---------- what's been pulled before ----------

function loadSeen(): Set<string> {
  try {
    const raw = JSON.parse(localStorage.getItem(SEEN_KEY) ?? "[]")
    if (Array.isArray(raw)) return new Set(raw.filter((x) => typeof x === "string"))
  } catch {}
  return new Set()
}

function saveSeen(seen: Set<string>) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]))
  } catch {
    // storage blocked (private window etc.) — the pile just won't be remembered
  }
}

function loadEnabled(): Set<string> {
  try {
    const raw = JSON.parse(localStorage.getItem(TOPICS_KEY) ?? "null")
    if (Array.isArray(raw)) {
      const keys = raw.filter((k) => TOPICS.some((t) => t.key === k))
      if (keys.length) return new Set(keys)
    }
  } catch {}
  return new Set(TOPICS.map((t) => t.key))
}

function saveEnabled(keys: Set<string>) {
  try {
    localStorage.setItem(TOPICS_KEY, JSON.stringify([...keys]))
  } catch {}
}

// ---------- the PDFs ----------

const docs = new Map<string, Promise<any>>()

function docFor(url: string): Promise<any> {
  let doc = docs.get(url)
  if (!doc) {
    // Only the pages that get drawn are fetched, where the host does range
    // requests (GitHub Pages does); otherwise pdf.js quietly takes the whole file.
    doc = loadPdfjs().then(
      (lib) => lib.getDocument({ url, disableAutoFetch: true, disableStream: true }).promise,
    )
    doc.catch(() => docs.delete(url))
    docs.set(url, doc)
  }
  return doc
}

// Draws one page of a question, cropped to the slice that holds the question.
async function drawPart(
  doc: any,
  [pageNum, top, bottom]: [number, number, number],
  canvas: HTMLCanvasElement,
  cssWidth: number,
) {
  const page = await doc.getPage(pageNum)
  const full = page.getViewport({ scale: 1 })
  const scale = cssWidth / full.width
  const cssHeight = (bottom - top) * full.height * scale
  const ratio = Math.min(
    window.devicePixelRatio || 1,
    2,
    Math.sqrt(MAX_CANVAS_PIXELS / Math.max(cssWidth * cssHeight, 1)),
  )
  const viewport = page.getViewport({
    scale: scale * ratio,
    offsetY: -top * full.height * scale * ratio,
  })
  canvas.width = Math.max(1, Math.floor(cssWidth * ratio))
  canvas.height = Math.max(1, Math.floor(cssHeight * ratio))
  canvas.style.aspectRatio = `${cssWidth} / ${cssHeight}`
  const ctx = canvas.getContext("2d")!
  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const task = page.render({ canvasContext: ctx, viewport })
  await task.promise
}

// ---------- the picker ----------

document.addEventListener("nav", () => {
  const root = document.querySelector<HTMLElement>(".randomq")
  if (!root) return

  // Only pages with <div class="random-question-slot"></div> get the picker.
  const slot = document.querySelector("article .random-question-slot")
  if (!slot) return
  if (!slot.contains(root)) slot.appendChild(root)
  root.classList.add("ready")

  const base = pathToRoot(getFullSlug(window))
  const href = (path: string) => new URL(base + encodeURI(path), window.location.href).href

  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel)!
  const pullBtn = $<HTMLButtonElement>(".randomq-pull")
  const stage = $<HTMLElement>(".randomq-stage")
  const empty = $<HTMLElement>(".randomq-empty")
  const sheet = $<HTMLElement>(".randomq-sheet")
  const label = $(".randomq-label")
  const progress = $(".randomq-progress")
  const foot = $<HTMLElement>(".randomq-foot")

  const enabled = loadEnabled()
  const seen = loadSeen()
  let shown: { topic: Topic; question: Question } | null = null
  let drawnWidth = 0
  let run = 0 // so a slow draw can't land after a newer one

  // ---------- topic buttons ----------

  const topicButtons = Array.from(root.querySelectorAll<HTMLButtonElement>(".randomq-topic"))

  function paintTopics() {
    for (const button of topicButtons) {
      button.setAttribute("aria-pressed", String(enabled.has(button.dataset.topic!)))
    }
  }

  function toggleTopic(this: HTMLButtonElement) {
    reshuffled = false
    const key = this.dataset.topic!
    if (enabled.has(key)) {
      if (enabled.size === 1) return // keep at least one standard in the pile
      enabled.delete(key)
    } else {
      enabled.add(key)
    }
    saveEnabled(enabled)
    paintTopics()
    paintProgress()
  }

  // ---------- picking ----------

  const pool = () =>
    TOPICS.filter((t) => enabled.has(t.key)).flatMap((topic) =>
      topic.questions.map((question) => ({ topic, question })),
    )

  function paintProgress() {
    const all = pool()
    const left = all.filter(({ topic, question }) => !seen.has(id(topic, question))).length
    const done = all.length - left
    progress.textContent = reshuffled
      ? `that was all ${all.length} — going round again`
      : `${done} of ${all.length} done`
    progress.classList.toggle("all-done", reshuffled || (left === 0 && all.length > 0))
  }

  let reshuffled = false

  function pick() {
    const all = pool()
    if (!all.length) return null
    let fresh = all.filter(({ topic, question }) => !seen.has(id(topic, question)))
    reshuffled = !fresh.length
    if (reshuffled) {
      // Been through the lot — start the pile again rather than repeating forever.
      for (const { topic, question } of all) seen.delete(id(topic, question))
      saveSeen(seen)
      fresh = all
    }
    // Don't hand over the same question twice in a row if there's a choice.
    if (shown && fresh.length > 1) {
      fresh = fresh.filter((c) => c.topic !== shown!.topic || c.question !== shown!.question)
    }
    return fresh[Math.floor(Math.random() * fresh.length)]
  }

  // ---------- drawing ----------

  async function render(width: number) {
    if (!shown) return
    const me = ++run
    const { topic, question } = shown
    drawnWidth = width

    const canvases = question.parts.map(() => document.createElement("canvas"))
    for (const canvas of canvases) {
      canvas.className = "randomq-page"
      canvas.setAttribute("role", "img")
      canvas.setAttribute(
        "aria-label",
        `${topic.standard} ${topic.name}, ${question.year}, question ${question.n}`,
      )
    }

    let doc: any
    try {
      doc = await docFor(href(topic.file))
      if (me !== run) return
      for (let i = 0; i < question.parts.length; i++) {
        await drawPart(doc, question.parts[i], canvases[i], width)
        if (me !== run) return
      }
    } catch {
      if (me !== run) return
      sheet.innerHTML = ""
      const fallback = document.createElement("p")
      fallback.className = "randomq-error"
      fallback.innerHTML = `Couldn't draw this one. <a>Open the collated PDF</a> instead.`
      fallback.querySelector("a")!.setAttribute("href", href(topic.file))
      sheet.appendChild(fallback)
      return
    }

    sheet.replaceChildren(...canvases)
  }

  function show(next: { topic: Topic; question: Question }) {
    shown = next
    const { topic, question } = next
    seen.add(id(topic, question))
    saveSeen(seen)

    empty.hidden = true
    stage.hidden = false
    pullBtn.textContent = "Another one"
    label.textContent = `${topic.standard} ${topic.name} · ${question.year} · Question ${question.n}`
    paintProgress()

    const year = String(question.year)
    foot.querySelector<HTMLAnchorElement>('[data-kind="paper"]')!.href = href(
      topic.paper + year + ".pdf",
    )
    foot.querySelector<HTMLAnchorElement>('[data-kind="answers"]')!.href = href(
      topic.answers + year + ".pdf",
    )
    foot.querySelector<HTMLAnchorElement>('[data-kind="collated"]')!.href = href(topic.file)

    sheet.replaceChildren(spinner())
    void render(sheet.clientWidth || 700)
  }

  function spinner() {
    const p = document.createElement("p")
    p.className = "randomq-loading"
    p.textContent = "Drawing…"
    return p
  }

  function pull() {
    const next = pick()
    if (next) show(next)
  }

  function reset() {
    reshuffled = false
    for (const { topic, question } of pool()) seen.delete(id(topic, question))
    saveSeen(seen)
    paintProgress()
  }

  function splitWbts() {
    document.querySelector<HTMLButtonElement>(".wbts-toggle")?.click()
  }

  // ---------- wiring ----------

  paintTopics()
  paintProgress()

  const listen = <K extends keyof HTMLElementEventMap>(
    el: Element,
    type: K,
    fn: (e: HTMLElementEventMap[K]) => void,
  ) => {
    el.addEventListener(type, fn as EventListener)
    window.addCleanup(() => el.removeEventListener(type, fn as EventListener))
  }

  listen(pullBtn, "click", pull)
  listen($(".randomq-reset"), "click", reset)
  listen($(".randomq-wbts"), "click", splitWbts)
  for (const button of topicButtons) listen(button, "click", toggleTopic)

  // Redraw at the new size when the column changes width (WBTS opening, a resize,
  // turning the iPad around), but only when it's worth it.
  let resizeTimer: ReturnType<typeof setTimeout> | undefined
  const observer = new ResizeObserver(() => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      const width = sheet.clientWidth
      if (!shown || !width || Math.abs(width - drawnWidth) < 24) return
      void render(width)
    }, 250)
  })
  observer.observe(sheet)
  window.addCleanup(() => {
    clearTimeout(resizeTimer)
    observer.disconnect()
    run++
  })
})
