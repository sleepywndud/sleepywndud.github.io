// In-site PDF viewer. Covers the notes side only, so the WBTS split pane stays usable.
// Pages are drawn with pdf.js (loaded on first use), which also works on iPad,
// where a PDF inside a frame would only show its first page.
//
// Pinch (touch or trackpad) and Ctrl/Cmd + scroll/+/-/0 zoom the PDF, not the page.

const PDFJS = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs"
const PDFJS_WORKER = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs"
const INVERT_KEY = "pdf-invert"

const PT = 96 / 72 // CSS px per PDF point at 100%
const MIN_SCALE = 0.25 * PT
const MAX_SCALE = 5 * PT
const MAX_CANVAS_PIXELS = 16_000_000 // iPad Safari refuses bigger canvases

let pdfjsPromise: Promise<any> | null = null

function loadPdfjs(): Promise<any> {
  if (!pdfjsPromise) {
    const url = PDFJS
    pdfjsPromise = import(/* @vite-ignore */ url).then((lib) => {
      // Workers can't load from another site directly, so start one through a tiny local module.
      const blob = new Blob([`import "${PDFJS_WORKER}";`], { type: "text/javascript" })
      lib.GlobalWorkerOptions.workerPort = new Worker(URL.createObjectURL(blob), { type: "module" })
      return lib
    })
    pdfjsPromise.catch(() => (pdfjsPromise = null))
  }
  return pdfjsPromise
}

const icon = (body: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`

const ICONS = {
  prev: icon(`<path d="M15 18l-6-6 6-6"/>`),
  next: icon(`<path d="M9 18l6-6-6-6"/>`),
  up: icon(`<path d="M18 15l-6-6-6 6"/>`),
  down: icon(`<path d="M6 9l6 6 6-6"/>`),
  minus: icon(`<path d="M5 12h14"/>`),
  plus: icon(`<path d="M12 5v14M5 12h14"/>`),
  search: icon(`<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>`),
  rotate: icon(`<path d="M21 12a9 9 0 11-3-6.7"/><path d="M21 3v6h-6"/>`),
  invert: icon(
    `<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 010 18z" fill="currentColor"/>`,
  ),
  print: icon(
    `<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>`,
  ),
  download: icon(`<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/>`),
  newtab: icon(
    `<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>`,
  ),
  wbts: icon(
    `<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="12" y1="4" x2="12" y2="20"/><path d="M14.5 15.5c1-2.5 2-3.5 2.5-2s1 1.5 2-0.5"/>`,
  ),
  close: icon(`<path d="M6 6l12 12M18 6L6 18"/>`),
}

type Mode = "auto" | "width" | "page" | number

type Page = {
  i: number
  box: HTMLDivElement
  canvas: HTMLCanvasElement
  textDiv: HTMLDivElement
  w: number // size in points, unrotated
  h: number
  drawnKey: string
  task: any
  text: any // pdf.js TextLayer once built
  strs: string[] | null // text items, same order as the text layer's spans
}

let current: { close: () => void } | null = null

function open(href: string, title: string) {
  current?.close()

  const root = document.documentElement
  const el = document.createElement("div")
  el.id = "pdf-pane"
  el.innerHTML = `
    <div class="pdf-bar">
      <button data-act="close" title="Close (Esc)" aria-label="Close PDF">${ICONS.close}</button>
      <span class="pdf-title"></span>
      <span class="pdf-group">
        <button data-act="prev" title="Previous page" aria-label="Previous page">${ICONS.prev}</button>
        <input class="pdf-pagenum" inputmode="numeric" aria-label="Page number" value="1" />
        <span class="pdf-pagecount">/ –</span>
        <button data-act="next" title="Next page" aria-label="Next page">${ICONS.next}</button>
      </span>
      <span class="pdf-group">
        <button data-act="zoom-out" title="Zoom out (Ctrl/Cmd −)" aria-label="Zoom out">${ICONS.minus}</button>
        <select class="pdf-scale" aria-label="Zoom">
          <option value="custom" hidden></option>
          <option value="auto">Automatic</option>
          <option value="width">Page width</option>
          <option value="page">Whole page</option>
          <option value="0.5">50%</option>
          <option value="0.75">75%</option>
          <option value="1">100%</option>
          <option value="1.25">125%</option>
          <option value="1.5">150%</option>
          <option value="2">200%</option>
          <option value="3">300%</option>
          <option value="4">400%</option>
        </select>
        <button data-act="zoom-in" title="Zoom in (Ctrl/Cmd +)" aria-label="Zoom in">${ICONS.plus}</button>
      </span>
      <span class="pdf-group">
        <button data-act="find" title="Find (Ctrl/Cmd F)" aria-label="Find in PDF">${ICONS.search}</button>
        <button data-act="rotate" title="Rotate" aria-label="Rotate">${ICONS.rotate}</button>
        <button data-act="invert" title="Dark pages" aria-label="Dark pages" aria-pressed="false">${ICONS.invert}</button>
        <button data-act="print" title="Print (Ctrl/Cmd P)" aria-label="Print">${ICONS.print}</button>
        <a data-act="download" title="Download" aria-label="Download">${ICONS.download}</a>
        <a data-act="newtab" target="_blank" rel="noopener" title="Open in new tab" aria-label="Open in new tab">${ICONS.newtab}</a>
        <button data-act="wbts" title="Split screen with WBTS" aria-label="Split screen with WBTS">${ICONS.wbts}</button>
      </span>
    </div>
    <div class="pdf-find" hidden>
      <input type="search" placeholder="Find in PDF" aria-label="Find in PDF" />
      <span class="pdf-find-count"></span>
      <button data-act="find-prev" title="Previous match" aria-label="Previous match">${ICONS.up}</button>
      <button data-act="find-next" title="Next match" aria-label="Next match">${ICONS.down}</button>
      <button data-act="find-close" title="Close find" aria-label="Close find">${ICONS.close}</button>
    </div>
    <div class="pdf-scroll" tabindex="-1">
      <div class="pdf-pages"><div class="pdf-status">Loading…</div></div>
    </div>
  `
  const $ = <T extends Element = HTMLElement>(sel: string) => el.querySelector<T>(sel)!
  $(".pdf-title").textContent = title
  $<HTMLAnchorElement>('[data-act="newtab"]').href = href
  const dl = $<HTMLAnchorElement>('[data-act="download"]')
  dl.href = href
  dl.download = decodeURIComponent(new URL(href).pathname.split("/").pop() ?? "document.pdf")

  document.body.appendChild(el)
  root.classList.add("pdf-open")

  const scroller = $<HTMLDivElement>(".pdf-scroll")
  const pagesEl = $<HTMLDivElement>(".pdf-pages")
  const status = $<HTMLDivElement>(".pdf-status")
  const pageInput = $<HTMLInputElement>(".pdf-pagenum")
  const pageCount = $(".pdf-pagecount")
  const scaleSelect = $<HTMLSelectElement>(".pdf-scale")
  const findBar = $(".pdf-find")
  const findInput = $<HTMLInputElement>(".pdf-find input")
  const findCount = $(".pdf-find-count")
  const invertBtn = $('[data-act="invert"]')
  const printBtn = $<HTMLButtonElement>('[data-act="print"]')
  scroller.focus({ preventScroll: true })

  let lib: any = null
  let doc: any = null
  let closed = false
  let pages: Page[] = []
  let mode: Mode = "auto"
  let scale = PT
  let rotation = 0
  let currentPage = 1
  const visible = new Set<Page>()
  const cleanups: (() => void)[] = []
  const on = (
    target: EventTarget | Document,
    type: string,
    fn: (e: any) => void,
    opts?: AddEventListenerOptions | boolean,
  ) => {
    ;(target as EventTarget).addEventListener(type, fn, opts)
    cleanups.push(() => (target as EventTarget).removeEventListener(type, fn, opts))
  }

  // ---------- Dark pages ----------

  function setInvert(onOff: boolean) {
    el.classList.toggle("pdf-invert", onOff)
    invertBtn.setAttribute("aria-pressed", String(onOff))
    try {
      localStorage.setItem(INVERT_KEY, onOff ? "1" : "0")
    } catch {}
  }
  try {
    setInvert(localStorage.getItem(INVERT_KEY) === "1")
  } catch {}

  // ---------- Sizing ----------

  const rotated = () => rotation % 180 !== 0
  const pageW = (p: Page) => (rotated() ? p.h : p.w)
  const pageH = (p: Page) => (rotated() ? p.w : p.h)

  function resolveScale(m: Mode): number {
    if (typeof m === "number") return m * PT
    const ref = pages[currentPage - 1] ?? pages[0]
    if (!ref) return PT
    const availW = scroller.clientWidth - 32
    const availH = scroller.clientHeight - 32
    const fitW = availW / pageW(ref)
    const fitP = Math.min(fitW, availH / pageH(ref))
    if (m === "width") return fitW
    if (m === "page") return fitP
    return Math.min(fitW, 1.5 * PT) // auto: page width, but no bigger than 150%
  }

  function clampScale(s: number) {
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s))
  }

  function updateScaleSelect() {
    const key = typeof mode === "number" ? String(mode) : mode
    const match = [...scaleSelect.options].find((o) => o.value === key && o.value !== "custom")
    if (match) {
      scaleSelect.value = key
    } else {
      const custom = scaleSelect.options[0]
      custom.textContent = `${Math.round((scale / PT) * 100)}%`
      scaleSelect.value = "custom"
    }
  }

  function layout() {
    for (const p of pages) {
      p.box.style.width = `${Math.floor(pageW(p) * scale)}px`
      p.box.style.height = `${Math.floor(pageH(p) * scale)}px`
      p.box.style.setProperty("--scale-factor", String(scale))
    }
    updateScaleSelect()
  }

  // Set the zoom, keeping the point (cx, cy) on screen still. No point: keep the middle.
  function setMode(m: Mode, cx?: number, cy?: number) {
    const rect = scroller.getBoundingClientRect()
    const ax = (cx ?? rect.left + rect.width / 2) - rect.left
    const ay = (cy ?? rect.top + rect.height / 2) - rect.top
    const x = scroller.scrollLeft + ax
    const y = scroller.scrollTop + ay
    const old = scale
    mode = typeof m === "number" ? clampScale(m * PT) / PT : m
    scale = clampScale(resolveScale(mode))
    layout()
    const r = scale / old
    scroller.scrollLeft = x * r - ax
    scroller.scrollTop = y * r - ay
    scheduleDraw()
  }

  function zoomBy(factor: number, cx?: number, cy?: number) {
    setMode((scale * factor) / PT, cx, cy)
  }

  // ---------- Drawing ----------

  let drawTimer: ReturnType<typeof setTimeout> | undefined
  function scheduleDraw() {
    clearTimeout(drawTimer)
    drawTimer = setTimeout(() => visible.forEach(draw), 120)
  }

  async function draw(p: Page) {
    const key = `${scale}:${rotation}`
    if (p.drawnKey === key || closed) return
    p.drawnKey = key
    p.task?.cancel()
    const page = await doc.getPage(p.i + 1)
    if (closed || p.drawnKey !== key) return
    const cssW = pageW(p) * scale
    const cssH = pageH(p) * scale
    const ratio = Math.min(
      window.devicePixelRatio || 1,
      Math.sqrt(MAX_CANVAS_PIXELS / (cssW * cssH)),
    )
    const vp = page.getViewport({ scale: scale * ratio, rotation })
    const canvas = document.createElement("canvas")
    canvas.width = Math.floor(vp.width)
    canvas.height = Math.floor(vp.height)
    p.task = page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp })
    try {
      await p.task.promise
    } catch {
      return // cancelled by a newer zoom
    }
    if (closed || p.drawnKey !== key) return
    p.canvas.replaceWith(canvas)
    p.canvas = canvas
    if (!p.text) buildText(p, page)
  }

  // Frees a far-away page's pixels; it is drawn again when scrolled back to.
  function undraw(p: Page) {
    p.task?.cancel()
    p.drawnKey = ""
    const blank = document.createElement("canvas")
    blank.width = blank.height = 0
    p.canvas.replaceWith(blank)
    p.canvas = blank
  }

  // Invisible, selectable text over the page (also used for find).
  async function buildText(p: Page, page: any) {
    const content = await page.getTextContent()
    if (closed || p.text) return
    p.textDiv.innerHTML = ""
    p.text = new lib.TextLayer({
      textContentSource: content,
      container: p.textDiv,
      viewport: page.getViewport({ scale: 1, rotation }),
    })
    await p.text.render()
    if (!closed) highlight(p)
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const p = pages[Number((e.target as HTMLElement).dataset.i)]
        if (e.isIntersecting) {
          visible.add(p)
          draw(p)
        } else {
          visible.delete(p)
          undraw(p)
        }
      }
    },
    { root: scroller, rootMargin: "150% 0px" },
  )
  cleanups.push(() => io.disconnect())

  // ---------- Pages ----------

  function updateCurrentPage() {
    if (!pages.length) return
    const mid = scroller.scrollTop + scroller.clientHeight / 3
    let n = 1
    for (const p of pages) {
      if (p.box.offsetTop <= mid) n = p.i + 1
      else break
    }
    currentPage = n
    if (document.activeElement !== pageInput) pageInput.value = String(n)
  }

  function goToPage(n: number) {
    const p = pages[Math.min(pages.length, Math.max(1, n)) - 1]
    if (!p) return
    scroller.scrollTop = p.box.offsetTop - 12
    updateCurrentPage()
  }

  // ---------- Find ----------

  let query = ""
  let matches: { page: number; item: number }[] = []
  let matchIndex = -1
  let scrollToMatch = false

  async function pageStrings(p: Page): Promise<string[]> {
    if (!p.strs) {
      const page = await doc.getPage(p.i + 1)
      const content = await page.getTextContent()
      p.strs = content.items.filter((it: any) => it.str !== undefined).map((it: any) => it.str)
    }
    return p.strs!
  }

  function highlight(p: Page) {
    if (!p.text) return
    const divs: HTMLElement[] = p.text.textDivs
    const strs: string[] = p.text.textContentItemsStr
    const cur = matches[matchIndex]
    divs.forEach((d, k) => {
      const hit = !!query && strs[k]?.toLowerCase().includes(query)
      d.classList.toggle("pdf-hit", hit)
      const isCur = hit && cur?.page === p.i && cur.item === k
      d.classList.toggle("pdf-hit-current", isCur)
      if (isCur && scrollToMatch) {
        scrollToMatch = false
        d.scrollIntoView({ block: "center", inline: "nearest" })
      }
    })
  }

  let findRun = 0
  async function runFind() {
    const run = ++findRun
    query = findInput.value.trim().toLowerCase()
    matches = []
    matchIndex = -1
    if (query) {
      for (const p of pages) {
        const strs = await pageStrings(p)
        if (run !== findRun || closed) return
        strs.forEach(
          (s, k) => s.toLowerCase().includes(query) && matches.push({ page: p.i, item: k }),
        )
      }
    }
    // Start from the first match at or after the current page.
    matchIndex = matches.findIndex((m) => m.page >= currentPage - 1)
    if (matchIndex < 0 && matches.length) matchIndex = 0
    showMatch()
  }

  function showMatch() {
    findCount.textContent = !query
      ? ""
      : matches.length
        ? `${matchIndex + 1} of ${matches.length}`
        : "No matches"
    const m = matches[matchIndex]
    if (m) {
      const p = pages[m.page]
      if (!visible.has(p) || !p.text) goToPage(m.page + 1)
      scrollToMatch = true
    }
    pages.forEach(highlight)
  }

  function stepMatch(d: number) {
    if (!matches.length) return
    matchIndex = (matchIndex + d + matches.length) % matches.length
    showMatch()
  }

  function openFind() {
    findBar.hidden = false
    findInput.focus()
    findInput.select()
  }

  function closeFind() {
    findBar.hidden = true
    findInput.value = ""
    runFind()
    scroller.focus({ preventScroll: true })
  }

  let findTimer: ReturnType<typeof setTimeout> | undefined
  on(findInput, "input", () => {
    clearTimeout(findTimer)
    findTimer = setTimeout(runFind, 200)
  })
  on(findInput, "keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (findInput.value.trim().toLowerCase() !== query) runFind()
      else stepMatch(e.shiftKey ? -1 : 1)
    }
  })

  // ---------- Print ----------

  let printHolder: HTMLDivElement | null = null
  let printUrls: string[] = []

  function clearPrint() {
    printHolder?.remove()
    printHolder = null
    printUrls.forEach((u) => URL.revokeObjectURL(u))
    printUrls = []
    root.classList.remove("pdf-printing")
  }

  // Draws every page as an image and prints only those.
  async function print() {
    if (!doc || printBtn.disabled) return
    clearPrint()
    printBtn.disabled = true
    printBtn.classList.add("busy")
    try {
      const holder = document.createElement("div")
      holder.id = "pdf-print"
      for (const p of pages) {
        const page = await doc.getPage(p.i + 1)
        const vp = page.getViewport({ scale: 2, rotation }) // 144 dpi
        const canvas = document.createElement("canvas")
        canvas.width = Math.floor(vp.width)
        canvas.height = Math.floor(vp.height)
        await page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp }).promise
        const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"))
        if (closed || !blob) return
        const url = URL.createObjectURL(blob)
        printUrls.push(url)
        const img = document.createElement("img")
        img.src = url
        holder.appendChild(img)
        canvas.width = canvas.height = 0
      }
      document.body.appendChild(holder)
      printHolder = holder
      await Promise.all([...holder.querySelectorAll("img")].map((i) => i.decode().catch(() => {})))
      root.classList.add("pdf-printing")
      window.print()
    } finally {
      printBtn.disabled = false
      printBtn.classList.remove("busy")
    }
  }
  on(window, "afterprint", clearPrint)

  // ---------- Toolbar ----------

  on(el, "click", (e: MouseEvent) => {
    const btn = (e.target as Element).closest<HTMLElement>("[data-act]")
    if (!btn) return
    switch (btn.dataset.act) {
      case "close":
        return close()
      case "prev":
        return goToPage(currentPage - 1)
      case "next":
        return goToPage(currentPage + 1)
      case "zoom-in":
        return zoomBy(1.25)
      case "zoom-out":
        return zoomBy(0.8)
      case "find":
        return findBar.hidden ? openFind() : closeFind()
      case "find-prev":
        return stepMatch(-1)
      case "find-next":
        return stepMatch(1)
      case "find-close":
        return closeFind()
      case "rotate":
        return rotate()
      case "invert":
        return setInvert(!el.classList.contains("pdf-invert"))
      case "print":
        return void print()
      case "wbts":
        // The sidebar's WBTS button is under the viewer, so this one presses it.
        return document.querySelector<HTMLButtonElement>(".wbts-toggle")?.click()
    }
  })

  on(scaleSelect, "change", () => {
    const v = scaleSelect.value
    if (v === "custom") return
    setMode(v === "auto" || v === "width" || v === "page" ? v : parseFloat(v))
    scroller.focus({ preventScroll: true })
  })

  on(pageInput, "change", () => goToPage(parseInt(pageInput.value, 10) || currentPage))
  on(pageInput, "keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      goToPage(parseInt(pageInput.value, 10) || currentPage)
      pageInput.blur()
    }
  })
  on(pageInput, "focus", () => pageInput.select())

  function rotate() {
    const keep = currentPage
    rotation = (rotation + 90) % 360
    for (const p of pages) {
      p.text?.cancel?.()
      p.text = null
      p.textDiv.innerHTML = ""
      p.drawnKey = ""
    }
    scale = clampScale(resolveScale(mode))
    layout()
    goToPage(keep)
    scheduleDraw()
  }

  // ---------- Zoom gestures ----------
  // Listened for on the whole document while the viewer is open, so a pinch anywhere
  // (toolbar, edges, behind the pages) zooms the PDF and never the site itself.

  // Zoom around a point if it's over the pages, otherwise around the middle.
  function zoomAround(factor: number, cx: number, cy: number) {
    const r = scroller.getBoundingClientRect()
    const inside = cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom
    if (inside) zoomBy(factor, cx, cy)
    else zoomBy(factor)
  }

  let gesture0 = 0
  let gesturing = false // Safari pinch in progress: ignore its matching wheel events

  // Trackpad pinch in Chrome/Firefox/Edge (sent as Ctrl + wheel), and Ctrl/Cmd + mouse wheel.
  on(
    window,
    "wheel",
    (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return
      if ((e.target as Element)?.closest?.("#wbts-pane")) return
      e.preventDefault()
      if (gesturing) return
      // Capped so one mouse-wheel notch is a small step; trackpad pinches send small deltas.
      const raw = e.deltaMode === 1 ? e.deltaY * 20 : e.deltaY
      const delta = Math.max(-25, Math.min(25, raw))
      zoomAround(Math.exp(-delta * 0.01), e.clientX, e.clientY)
    },
    { passive: false, capture: true },
  )

  // Safari (Mac trackpad and iPad) pinch.
  on(
    document,
    "gesturestart",
    (e: any) => {
      e.preventDefault()
      gesturing = true
      gesture0 = scale
    },
    { passive: false, capture: true },
  )
  on(
    document,
    "gesturechange",
    (e: any) => {
      e.preventDefault()
      // On iPad the touch handlers below do the zooming; this only stops the site zoom.
      if (pinch || !gesture0) return
      const target = clampScale(gesture0 * e.scale)
      zoomAround(target / scale, e.clientX, e.clientY)
    },
    { passive: false, capture: true },
  )
  on(
    document,
    "gestureend",
    (e: any) => {
      e.preventDefault()
      gesturing = false
      gesture0 = 0
    },
    { passive: false, capture: true },
  )

  // Two-finger pinch on touch screens: scale the pages live, redraw sharp at the end.
  let pinch: { d0: number; s0: number; x: number; y: number; f: number } | null = null
  const dist = (t: TouchList) =>
    Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY)

  on(
    document,
    "touchstart",
    (e: TouchEvent) => {
      if (e.touches.length !== 2) return
      e.preventDefault()
      const t = e.touches
      const x = (t[0].clientX + t[1].clientX) / 2
      const y = (t[0].clientY + t[1].clientY) / 2
      const rect = scroller.getBoundingClientRect()
      const ox = Math.min(Math.max(x, rect.left), rect.right) - rect.left
      const oy = Math.min(Math.max(y, rect.top), rect.bottom) - rect.top
      pagesEl.style.transformOrigin = `${scroller.scrollLeft + ox}px ${scroller.scrollTop + oy}px`
      pinch = { d0: dist(t), s0: scale, x, y, f: 1 }
    },
    { passive: false, capture: true },
  )
  on(
    document,
    "touchmove",
    (e: TouchEvent) => {
      if (e.touches.length < 2) return
      e.preventDefault() // never let two fingers zoom the site
      if (!pinch) return
      pinch.f = clampScale(pinch.s0 * (dist(e.touches) / pinch.d0)) / pinch.s0
      pagesEl.style.transform = `scale(${pinch.f})`
    },
    { passive: false, capture: true },
  )
  const endPinch = () => {
    if (!pinch) return
    const { s0, f, x, y } = pinch
    pinch = null
    pagesEl.style.transform = ""
    zoomAround((s0 * f) / scale, x, y)
  }
  on(document, "touchend", (e: TouchEvent) => e.touches.length < 2 && endPinch(), true)
  on(document, "touchcancel", endPinch, true)

  // Also stop the browser's own pinch zoom on phones/iPads while the viewer is open.
  const viewportMeta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]')
  const viewportBefore = viewportMeta?.content
  if (viewportMeta) {
    viewportMeta.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    cleanups.push(() => {
      if (viewportBefore !== undefined) viewportMeta.content = viewportBefore
    })
  }

  // ---------- Keys ----------

  on(
    document,
    "keydown",
    (e: KeyboardEvent) => {
      if (root.classList.contains("screensaver-open")) return
      const mod = e.ctrlKey || e.metaKey
      const typing = (e.target as Element)?.closest?.("input, select, textarea")
      if (mod && (e.key === "=" || e.key === "+")) zoomBy(1.25)
      else if (mod && e.key === "-") zoomBy(0.8)
      else if (mod && e.key === "0") setMode("auto")
      else if (mod && e.key.toLowerCase() === "f") openFind()
      else if (mod && e.key.toLowerCase() === "p") void print()
      else if (e.key === "Escape") {
        if (!findBar.hidden) closeFind()
        else close()
      } else if (!typing && !mod && e.key === "ArrowRight") goToPage(currentPage + 1)
      else if (!typing && !mod && e.key === "ArrowLeft") goToPage(currentPage - 1)
      else return
      e.preventDefault()
      e.stopPropagation()
    },
    true,
  )

  // ---------- Load ----------

  on(scroller, "scroll", updateCurrentPage, { passive: true })

  let resizeTimer: ReturnType<typeof setTimeout> | undefined
  const ro = new ResizeObserver(() => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (!pages.length || typeof mode === "number") return
      const keep = currentPage
      scale = clampScale(resolveScale(mode))
      layout()
      goToPage(keep)
      scheduleDraw()
    }, 150)
  })
  ro.observe(scroller)
  cleanups.push(() => ro.disconnect())

  loadPdfjs()
    .then((l) => {
      lib = l
      return lib.getDocument(href).promise
    })
    .then(async (d: any) => {
      if (closed) return d.destroy()
      doc = d
      for (let i = 0; i < doc.numPages; i++) {
        const page = await doc.getPage(i + 1)
        if (closed) return
        const vp = page.getViewport({ scale: 1 })
        const box = document.createElement("div")
        box.className = "pdf-page-box"
        box.dataset.i = String(i)
        const canvas = document.createElement("canvas")
        const textDiv = document.createElement("div")
        textDiv.className = "textLayer"
        box.append(canvas, textDiv)
        pages.push({
          i,
          box,
          canvas,
          textDiv,
          w: vp.width,
          h: vp.height,
          drawnKey: "",
          task: null,
          text: null,
          strs: null,
        })
      }
      status.remove()
      pagesEl.append(...pages.map((p) => p.box))
      pageCount.textContent = `/ ${pages.length}`
      scale = clampScale(resolveScale(mode))
      layout()
      pages.forEach((p) => io.observe(p.box))
      updateCurrentPage()
    })
    .catch(() => {
      if (closed) return
      status.innerHTML = `Couldn't show this PDF here. <a target="_blank" rel="noopener">Open it in a new tab</a>.`
      status.querySelector("a")!.href = href
    })

  function close() {
    if (closed) return
    closed = true
    clearTimeout(drawTimer)
    cleanups.forEach((fn) => fn())
    clearPrint()
    pages.forEach((p) => p.task?.cancel())
    doc?.destroy()
    el.remove()
    root.classList.remove("pdf-open")
    if (current === viewer) current = null
  }

  const viewer = { close }
  current = viewer
}

// Catch PDF link clicks before the page router does.
document.addEventListener(
  "click",
  (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return
    const a = (e.target as Element | null)?.closest?.("a")
    if (!a || !a.href || a.closest("#pdf-pane") || a.hasAttribute("download")) return
    const url = new URL(a.href)
    if (url.origin !== window.location.origin || !url.pathname.toLowerCase().endsWith(".pdf"))
      return
    e.preventDefault()
    e.stopPropagation()
    const name = decodeURIComponent(url.pathname.split("/").slice(-3).join(" / ")).replace(
      /\.pdf$/i,
      "",
    )
    open(url.href, name)
  },
  true,
)

// Going to another note closes the viewer.
document.addEventListener("prenav", () => current?.close())
