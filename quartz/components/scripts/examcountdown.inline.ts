const TZ = "Pacific/Auckland"
const EXAM_LENGTH_MS = 3 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

// Whole calendar days between now and the exam, counted in NZ time.
function nzDayDiff(from: Date, to: Date): number {
  const day = (d: Date) => Date.parse(d.toLocaleDateString("en-CA", { timeZone: TZ }))
  return Math.round((day(to) - day(from)) / DAY_MS)
}

// Returns null once the exam is over.
function label(start: Date, now: Date): string | null {
  const ms = start.getTime() - now.getTime()
  if (ms <= -EXAM_LENGTH_MS) return null
  if (ms <= 0) return "happening now"
  const days = nzDayDiff(now, start)
  if (days <= 0) return "today"
  if (days === 1) return "tomorrow"
  return `${days} days`
}

function formatDate(start: Date): string {
  return start.toLocaleString("en-NZ", {
    timeZone: TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  })
}

function urgency(start: Date, now: Date): string {
  const days = nzDayDiff(now, start)
  if (days <= 3) return "soon"
  if (days <= 14) return "near"
  return "far"
}

document.addEventListener("nav", () => {
  const root = document.querySelector<HTMLElement>(".exam-countdown")
  if (!root) return

  // Only pages with <div class="exam-countdown-slot"></div> get the countdown.
  const slot = document.querySelector("article .exam-countdown-slot")
  if (!slot) return
  if (!slot.contains(root)) slot.appendChild(root)

  const now = new Date()
  const items = Array.from(root.querySelectorAll<HTMLElement>(".exam-countdown-item"))

  // Standard number in each past-paper heading, e.g. "91262 Calculus".
  const onPage = new Set(
    Array.from(document.querySelectorAll("article details > summary"))
      .map((summary) => summary.textContent?.match(/\b9\d{4}\b/)?.[0])
      .filter((num): num is string => !!num),
  )

  // Banner: exams for the standards on this page that haven't finished yet.
  let visible = 0
  for (const item of items) {
    const start = new Date(item.dataset.start ?? "")
    const text = label(start, now)
    const relevant = (item.dataset.standards ?? "").split(",").some((s) => onPage.has(s))
    item.hidden = !text || !relevant
    if (item.hidden) continue
    item.querySelector(".exam-countdown-date")!.textContent = formatDate(start)
    item.querySelector(".exam-countdown-left")!.textContent = text
    item.dataset.urgency = urgency(start, now)
    visible++
  }
  root.classList.toggle("has-exams", visible > 0)
})
