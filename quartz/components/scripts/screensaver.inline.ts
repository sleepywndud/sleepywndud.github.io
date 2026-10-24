// Full-screen clock, ported from wndx2.github.io.
// Covers the browser window (no fullscreen). Exit with Esc or the × button.

const palettes = [
  ["#ff9a8b", "#ffc4b8", "#e0604f"], // coral
  ["#ffb86b", "#ffe0a8", "#e08a2e"], // amber
  ["#9ee6a8", "#d4f7c9", "#4fb862"], // mint
  ["#7cc7ff", "#bfe3ff", "#3d8fd6"], // sky
  ["#b79bff", "#ddd0ff", "#7f5ce0"], // lavender
  ["#ff8fc7", "#ffc9e4", "#d9509a"], // pink
  ["#ffd800", "#ffeb80", "#c9a800"], // yellow
  ["#f2f2f2", "#9a9a9a", "#5a5a5a"], // mono
]

// auto mode skips yellow and mono
const autoSkip = ["#ffd800", "#f2f2f2"]
const autoPalettes = [...palettes.keys()].filter((i) => !autoSkip.includes(palettes[i][0]))

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const STORAGE_KEY = "standby-color"

let overlay: HTMLDivElement | null = null
let stopFns: (() => void)[] = []

function loadChoice(): number {
  try {
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) ?? "", 10)
    if (saved >= -1 && saved < palettes.length) return saved
  } catch {}
  return -1 // auto
}

function loadFont() {
  if (document.getElementById("screensaver-font")) return
  const link = document.createElement("link")
  link.id = "screensaver-font"
  link.rel = "stylesheet"
  link.href = "https://fonts.googleapis.com/css2?family=SN+Pro:wght@900&display=swap"
  document.head.appendChild(link)
}

function open() {
  if (overlay) return
  loadFont()

  overlay = document.createElement("div")
  overlay.className = "screensaver"
  overlay.innerHTML = `
    <div class="ss-clock">
      <div class="ss-face">
        <div class="ss-time">
          <span class="ss-digit ss-hour">0</span>
          <span class="ss-digit ss-hour">0</span>
          <span class="ss-colon">:</span>
          <span class="ss-digit ss-minute">0</span>
          <span class="ss-digit ss-minute">0</span>
        </div>
        <div class="ss-date"></div>
      </div>
    </div>
    <div class="ss-swatches"></div>
    <button class="ss-close" aria-label="Close screensaver">×</button>
    <div class="ss-hint">[ ← ] [ → ] colour · [ esc ] exit</div>
  `
  document.body.appendChild(overlay)
  document.documentElement.classList.add("screensaver-open")
  void overlay.offsetWidth // apply opacity 0 first so the fade-in runs
  overlay.classList.add("visible")

  const ov = overlay
  const digits = [...ov.querySelectorAll<HTMLElement>(".ss-digit")]
  const dateEl = ov.querySelector<HTMLElement>(".ss-date")!
  const clock = ov.querySelector<HTMLElement>(".ss-clock")!
  const swatchBox = ov.querySelector<HTMLElement>(".ss-swatches")!

  let choice = loadChoice()

  function setDigit(el: HTMLElement, value: string) {
    if (el.textContent === value) return
    el.textContent = value
    el.classList.remove("tick")
    void el.offsetWidth // restart the pop animation
    el.classList.add("tick")
  }

  function applyColor(now = new Date()) {
    const secs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
    const step = Math.floor(secs / 10)
    const i = choice === -1 ? autoPalettes[step % autoPalettes.length] : choice
    const [hc, mc, cc] = palettes[i]
    ov.style.setProperty("--hour", hc)
    ov.style.setProperty("--minute", mc)
    ov.style.setProperty("--colon", cc)
  }

  function update() {
    const now = new Date()
    const h = String(now.getHours()).padStart(2, "0")
    const m = String(now.getMinutes()).padStart(2, "0")
    ;(h + m).split("").forEach((d, i) => setDigit(digits[i], d))

    const dd = String(now.getDate()).padStart(2, "0")
    const mm = String(now.getMonth() + 1).padStart(2, "0")
    dateEl.textContent = `${days[now.getDay()].toUpperCase()} ${dd}.${mm}.${now.getFullYear()}`
    applyColor(now)
  }

  // colour swatches (-1 = auto)
  const swatches = [-1, ...palettes.keys()].map((i) => {
    const b = document.createElement("button")
    b.className = "ss-swatch" + (i === -1 ? " auto" : "")
    if (i !== -1) b.style.background = palettes[i][0]
    b.title = i === -1 ? "auto" : ""
    b.addEventListener("click", () => setChoice(i))
    swatchBox.appendChild(b)
    return b
  })

  function setChoice(i: number) {
    choice = i
    try {
      localStorage.setItem(STORAGE_KEY, String(i))
    } catch {}
    swatches.forEach((b, j) => b.classList.toggle("active", j - 1 === i))
    ov.classList.toggle("auto", i === -1)
    applyColor()
  }
  setChoice(choice)

  function onKey(e: KeyboardEvent) {
    const n = palettes.length + 1
    if (e.key === "Escape") close()
    else if (e.key === "ArrowRight") setChoice(((choice + 2) % n) - 1)
    else if (e.key === "ArrowLeft") setChoice(((choice + n) % n) - 1)
    else return
    e.preventDefault()
    e.stopPropagation()
  }
  document.addEventListener("keydown", onKey, true)

  // burn-in protection: drift the clock a little every 30s
  function drift() {
    const x = (Math.random() - 0.5) * 4
    const y = (Math.random() - 0.5) * 4
    clock.style.transform = `translate(${x}vw, ${y}vh)`
  }

  // hide cursor and controls when idle
  let idleTimer: ReturnType<typeof setTimeout>
  function wake() {
    ov.classList.remove("idle")
    clearTimeout(idleTimer)
    idleTimer = setTimeout(() => ov.classList.add("idle"), 3000)
  }
  const wakeEvents = ["mousemove", "mousedown", "touchstart"]
  wakeEvents.forEach((e) => ov.addEventListener(e, wake))
  wake()

  ov.querySelector(".ss-close")!.addEventListener("click", close)

  update()
  const tick = setInterval(update, 1000)
  const driftTimer = setInterval(drift, 30000)

  stopFns = [
    () => clearInterval(tick),
    () => clearInterval(driftTimer),
    () => clearTimeout(idleTimer),
    () => document.removeEventListener("keydown", onKey, true),
  ]
}

function close() {
  if (!overlay) return
  const ov = overlay
  overlay = null // lets the button open a new one even mid-fade
  stopFns.forEach((fn) => fn())
  stopFns = []

  // fade out, then remove
  ov.classList.add("closing")
  ov.classList.remove("visible")
  let done = false
  const finish = () => {
    if (done) return
    done = true
    ov.remove()
    if (!overlay) document.documentElement.classList.remove("screensaver-open")
  }
  ov.addEventListener("transitionend", (e) => {
    if (e.target === ov && e.propertyName === "opacity") finish()
  })
  setTimeout(finish, 800) // in case transitionend never fires
}

document.addEventListener("nav", () => {
  for (const button of document.getElementsByClassName("screensaver-toggle")) {
    button.addEventListener("click", open)
    window.addCleanup(() => button.removeEventListener("click", open))
  }
})
