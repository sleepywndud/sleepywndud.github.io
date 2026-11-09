// Random L3 excellence question picker.
//
// The three collated PDFs (91577 / 91578 / 91579) hold one question per page,
// the rest of the page being ruled answer space. data/l3excellence.ts says which
// slice of which page each question lives on, so pdf.js can draw the question on
// its own. Nothing but the PDFs already on the site is needed.
//
// The picker is a pane over the whole window rather than something inside the
// notes column, so the question gets the full width and none of the page
// furniture. Like the PDF viewer it stops where the WBTS pad starts, so the pad
// can still take half the screen.

import { MAX_CANVAS_PIXELS, loadPdfjs } from "./pdfjs"
import { TOPICS, type Question, type Topic } from "../data/l3excellence"
import { getFullSlug, pathToRoot } from "../../util/path"

const SEEN_KEY = "randomq-seen"
const TOPICS_KEY = "randomq-topics"
const GAP = 16 // between the pages of a question that runs over two

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

// ---------- icons ----------

const icon = (body: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`

const ICONS = {
  close: icon(`<path d="M6 6l12 12M18 6L6 18"/>`),
  wbts: icon(
    `<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="12" y1="4" x2="12" y2="20"/><path d="M14.5 15.5c1-2.5 2-3.5 2.5-2s1 1.5 2-0.5"/>`,
  ),
}

// ---------- the pane ----------

let pane: { close: () => void } | null = null

function open() {
  pane?.close()

  const root = document.documentElement
  const base = pathToRoot(getFullSlug(window))
  const href = (path: string) => new URL(base + encodeURI(path), window.location.href).href

  const el = document.createElement("div")
  el.id = "randomq-pane"
  el.innerHTML = `
    <div class="randomq-bar">
      <button data-act="close" title="Close (Esc)" aria-label="Close">${ICONS.close}</button>
      <span class="randomq-topics" role="group" aria-label="Which standards to pull from">
        ${TOPICS.map(
          (t) =>
            `<button class="randomq-topic" data-topic="${t.key}" aria-pressed="true" title="${t.standard} ${t.name} — ${t.questions.length} questions"><span class="randomq-topic-name">${t.short}</span><span class="randomq-topic-std">${t.standard}</span></button>`,
        ).join("")}
      </span>
      <span class="randomq-progress"></span>
      <button class="randomq-reset" data-act="reset" title="Start the pile of unseen questions again">Reset</button>
      <button class="randomq-wbts" data-act="wbts" title="Split screen with WBTS" aria-label="Split screen with WBTS">${ICONS.wbts}<span>WBTS</span></button>
      <button class="randomq-pull" data-act="pull">Pull a question</button>
    </div>
    <div class="randomq-stage">
      <div class="randomq-head">
        <span class="randomq-label"></span>
        <span class="randomq-links">
          <a data-kind="paper">Full paper</a>
          <a data-kind="answers">Answer schedule</a>
          <a data-kind="collated">All of these</a>
        </span>
      </div>
      <div class="randomq-sheet" aria-live="polite"></div>
    </div>
  `
  document.body.appendChild(el)
  root.classList.add("randomq-open")

  const $ = <T extends Element = HTMLElement>(sel: string) => el.querySelector<T>(sel)!
  const stage = $<HTMLElement>(".randomq-stage")
  const head = $<HTMLElement>(".randomq-head")
  const sheet = $<HTMLElement>(".randomq-sheet")
  const labelEl = $(".randomq-label")
  const progress = $(".randomq-progress")
  const pullBtn = $<HTMLButtonElement>(".randomq-pull")

  const enabled = loadEnabled()
  const seen = loadSeen()
  let shown: { topic: Topic; question: Question } | null = null
  let closed = false
  let reshuffled = false
  let run = 0 // so a slow draw can't land after a newer one

  const cleanups: (() => void)[] = []
  const on = (target: EventTarget | Document, type: string, fn: (e: any) => void, opts?: any) => {
    ;(target as EventTarget).addEventListener(type, fn, opts)
    cleanups.push(() => (target as EventTarget).removeEventListener(type, fn, opts))
  }

  // ---------- topics ----------

  const topicButtons = Array.from(el.querySelectorAll<HTMLButtonElement>(".randomq-topic"))

  function paintTopics() {
    for (const button of topicButtons) {
      button.setAttribute("aria-pressed", String(enabled.has(button.dataset.topic!)))
    }
  }

  function toggleTopic(button: HTMLButtonElement) {
    reshuffled = false
    const key = button.dataset.topic!
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
    progress.textContent = reshuffled
      ? `that was all ${all.length} — going round again`
      : `${all.length - left} of ${all.length} done`
    progress.classList.toggle("all-done", reshuffled || (left === 0 && all.length > 0))
  }

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

  // The question is sized to fit the pane: full width, unless that would make it
  // taller than the space left under the bar, in which case height wins.
  function fittedWidth(sizes: { w: number; h: number }[]) {
    const style = getComputedStyle(sheet)
    const padX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
    const padY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
    const availW = Math.max(120, stage.clientWidth - padX)
    const availH = Math.max(120, stage.clientHeight - head.offsetHeight - padY)
    const ratio = sizes.reduce((sum, s) => sum + s.h / s.w, 0) // height per unit width
    const byHeight = (availH - GAP * (sizes.length - 1)) / ratio
    return Math.max(120, Math.min(availW, byHeight))
  }

  async function drawPart(
    page: any,
    [, top, bottom]: [number, number, number],
    canvas: HTMLCanvasElement,
    cssWidth: number,
  ) {
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
    canvas.style.width = `${Math.round(cssWidth)}px`
    canvas.style.height = `${Math.round(cssHeight)}px`
    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    await page.render({ canvasContext: ctx, viewport }).promise
  }

  async function render() {
    if (!shown) return
    const me = ++run
    const { topic, question } = shown

    try {
      const doc = await docFor(href(topic.file))
      if (me !== run || closed) return
      const pages = await Promise.all(question.parts.map(([n]) => doc.getPage(n)))
      if (me !== run || closed) return

      const sizes = pages.map((page: any, i: number) => {
        const full = page.getViewport({ scale: 1 })
        const [, top, bottom] = question.parts[i]
        return { w: full.width, h: (bottom - top) * full.height }
      })
      const width = fittedWidth(sizes)

      const canvases: HTMLCanvasElement[] = []
      for (let i = 0; i < pages.length; i++) {
        const canvas = document.createElement("canvas")
        canvas.className = "randomq-page"
        canvas.setAttribute("role", "img")
        canvas.setAttribute(
          "aria-label",
          `${topic.standard} ${topic.name}, ${question.year}, question ${question.n}`,
        )
        await drawPart(pages[i], question.parts[i], canvas, width)
        if (me !== run || closed) return
        canvases.push(canvas)
      }
      sheet.replaceChildren(...canvases)
    } catch {
      if (me !== run || closed) return
      const fallback = document.createElement("p")
      fallback.className = "randomq-error"
      fallback.innerHTML = `Couldn't draw this one. <a>Open the collated PDF</a> instead.`
      fallback.querySelector("a")!.setAttribute("href", href(topic.file))
      sheet.replaceChildren(fallback)
    }
  }

  function show(next: { topic: Topic; question: Question }) {
    shown = next
    const { topic, question } = next
    seen.add(id(topic, question))
    saveSeen(seen)

    pullBtn.textContent = "Another one"
    labelEl.textContent = `${topic.standard} ${topic.name} · ${question.year} · Question ${question.n}`
    paintProgress()

    const year = String(question.year)
    const link = (kind: string) => $<HTMLAnchorElement>(`[data-kind="${kind}"]`)
    link("paper").href = href(topic.paper + year + ".pdf")
    link("answers").href = href(topic.answers + year + ".pdf")
    link("collated").href = href(topic.file)
    head.classList.add("has-question")

    const loading = document.createElement("p")
    loading.className = "randomq-loading"
    loading.textContent = "Drawing…"
    sheet.replaceChildren(loading)
    void render()
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

  // ---------- wiring ----------

  on(el, "click", (e: MouseEvent) => {
    const button = (e.target as Element).closest<HTMLElement>("[data-act], .randomq-topic")
    if (!button) return
    if (button.classList.contains("randomq-topic")) return toggleTopic(button as HTMLButtonElement)
    switch (button.dataset.act) {
      case "close":
        return close()
      case "pull":
        return pull()
      case "reset":
        return reset()
      case "wbts":
        // The sidebar's WBTS button is under the pane, so this one presses it.
        return void document.querySelector<HTMLButtonElement>(".wbts-toggle")?.click()
    }
  })

  // Not in the capture phase, so while the PDF viewer is open its own handler
  // (which does capture and stops there) gets these keys instead.
  on(document, "keydown", (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (e.key === "Escape") {
      close()
      e.preventDefault()
      return
    }
    // Let the focused control have its own keys (space on a button, etc.).
    if ((e.target as Element)?.closest?.("input, select, textarea, button, a")) return
    if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
      pull()
      e.preventDefault()
    }
  })

  // Redraw to fit when the pane changes size: WBTS opening or being dragged,
  // a window resize, an iPad turned around.
  let resizeTimer: ReturnType<typeof setTimeout> | undefined
  const observer = new ResizeObserver(() => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (!shown || closed) return
      const canvases = Array.from(sheet.querySelectorAll("canvas"))
      if (!canvases.length) return
      // Only redraw if the fit actually changed, so dragging doesn't thrash.
      const sizes = canvases.map((c) => ({ w: c.width, h: c.height }))
      const drawn = canvases[0].getBoundingClientRect().width
      if (Math.abs(fittedWidth(sizes) - drawn) >= 8) void render()
    }, 200)
  })
  observer.observe(stage)
  cleanups.push(() => observer.disconnect())

  paintTopics()
  paintProgress()
  pull() // land on a question rather than an empty pane

  function close() {
    if (closed) return
    closed = true
    run++
    clearTimeout(resizeTimer)
    cleanups.forEach((fn) => fn())
    el.remove()
    root.classList.remove("randomq-open")
    if (pane === handle) pane = null
    document.querySelector<HTMLButtonElement>(".randomq-launch")?.focus()
  }

  const handle = { close }
  pane = handle
}

// ---------- the page that opens it ----------

document.addEventListener("nav", () => {
  const slot = document.querySelector("article .random-question-slot")
  if (!slot) return

  let launcher = slot.querySelector<HTMLButtonElement>(".randomq-launch")
  if (!launcher) {
    launcher = document.createElement("button")
    launcher.className = "randomq-launch"
    launcher.textContent = "Pull a random question"
    slot.appendChild(launcher)
  }
  const click = () => open()
  launcher.addEventListener("click", click)
  window.addCleanup(() => launcher!.removeEventListener("click", click))

  // The page is the randomizer, so open it straight away.
  open()
})

// Going to another note closes the pane.
document.addEventListener("prenav", () => pane?.close())
