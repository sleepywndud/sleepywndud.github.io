// Split screen: notes on one side, WBTS (the scribble pad on wndx2.github.io) on the other.
// The pane is created once and kept across page changes (see spa.inline.ts),
// so drawings stay while you browse notes. Closing only hides it.

const WBTS_URL = "https://wndx2.github.io/WBTS/"
const OPEN_KEY = "wbts-split-open"
const SIZE_KEY = "wbts-split-size"
const MIN = 260 // smallest size for either side, in px
const stacked = window.matchMedia("(max-width: 800px)") // phones: pad below the notes

let pane: HTMLDivElement | null = null

function isOpen() {
  return document.documentElement.classList.contains("wbts-split")
}

// Share of the screen the pad takes, from 0 to 1.
function loadSize(): number {
  try {
    const v = parseFloat(localStorage.getItem(SIZE_KEY) ?? "")
    if (v > 0 && v < 1) return v
  } catch {}
  return 0.5
}

function applySize(fraction: number) {
  const total = stacked.matches ? window.innerHeight : window.innerWidth
  const px = Math.min(Math.max(fraction * total, MIN), total - MIN)
  const root = document.documentElement
  root.style.setProperty("--wbts-size", `${Math.round(px)}px`)
  // Notes get a simpler one-column layout when their side is narrow.
  root.classList.toggle("wbts-narrow", !stacked.matches && total - px < 640)
}

function createPane() {
  pane = document.createElement("div")
  pane.id = "wbts-pane"
  pane.dataset.persistPane = ""
  pane.innerHTML = `<div class="wbts-handle" role="separator" aria-label="Resize split"></div><button class="wbts-close" aria-label="Close WBTS" title="Close">×</button>`
  const frame = document.createElement("iframe")
  frame.title = "WBTS scribble pad"
  frame.src = WBTS_URL
  pane.appendChild(frame)
  // First in <body> so page changes leave it alone.
  document.body.prepend(pane)

  pane.querySelector(".wbts-close")!.addEventListener("click", () => setOpen(false))
  setupDrag(pane.querySelector<HTMLElement>(".wbts-handle")!)
}

function setupDrag(handle: HTMLElement) {
  handle.addEventListener("pointerdown", (e) => {
    e.preventDefault()
    handle.setPointerCapture(e.pointerId)
    document.documentElement.classList.add("wbts-dragging")
    let fraction = loadSize()

    const move = (ev: PointerEvent) => {
      fraction = stacked.matches
        ? (window.innerHeight - ev.clientY) / window.innerHeight
        : (window.innerWidth - ev.clientX) / window.innerWidth
      applySize(fraction)
    }
    const up = () => {
      handle.removeEventListener("pointermove", move)
      handle.removeEventListener("pointerup", up)
      handle.removeEventListener("pointercancel", up)
      document.documentElement.classList.remove("wbts-dragging")
      try {
        localStorage.setItem(SIZE_KEY, String(Math.min(Math.max(fraction, 0.1), 0.9)))
      } catch {}
    }
    handle.addEventListener("pointermove", move)
    handle.addEventListener("pointerup", up)
    handle.addEventListener("pointercancel", up)
  })
}

function setOpen(open: boolean) {
  if (open && !document.getElementById("wbts-pane")) createPane()
  applySize(loadSize())
  document.documentElement.classList.toggle("wbts-split", open)
  for (const b of document.getElementsByClassName("wbts-toggle")) {
    b.setAttribute("aria-pressed", String(open))
  }
  try {
    localStorage.setItem(OPEN_KEY, open ? "1" : "0")
  } catch {}
}

function toggle() {
  setOpen(!isOpen())
}

window.addEventListener("resize", () => {
  if (pane) applySize(loadSize())
})
stacked.addEventListener("change", () => {
  if (pane) applySize(loadSize())
})

// Reopen after a full reload if it was open before.
try {
  if (localStorage.getItem(OPEN_KEY) === "1") setOpen(true)
} catch {}

document.addEventListener("nav", () => {
  for (const button of document.getElementsByClassName("wbts-toggle")) {
    button.setAttribute("aria-pressed", String(isOpen()))
    button.addEventListener("click", toggle)
    window.addCleanup(() => button.removeEventListener("click", toggle))
  }
})
