import fs from "fs"
import path from "path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments, pathToRoot } from "../util/path"

// Banner under the homepage top bar, set in the page's frontmatter:
//   banner: /images/banner-n.png   one image, shown once
//   banner: doodles                your doodles (quartz/static/doodles/) in a row.
//                                  Hover = wiggle, click = hop and say something.
// Optional frontmatter for the doodle row:
//   doodles: [tajo, kat, ...]      which doodles, in order (default: all, in banner order)
//   doodle-says: [hi!, ...]        what they say when clicked

// Where each doodle sat in the original banner image (made by the doodle cut-out script).
// Used to rebuild the banner with the same spacing.
const POSITIONS_FILE = path.join("quartz", "static", "doodles", "positions.json")
type Positions = {
  bannerWidth: number
  bannerHeight: number
  order: string[]
  doodles: Record<string, { left: number; right: number }>
}
function readPositions(): Positions | undefined {
  try {
    return JSON.parse(fs.readFileSync(POSITIONS_FILE, "utf8"))
  } catch {
    return undefined
  }
}

const DEFAULT_SAYS = [
  "hi!",
  "kia ora!",
  "study hard!",
  "boop",
  "you got this",
  "excellence!!",
  "zzz…",
]
// Tallest the row is allowed to get on screen.
const MAX_ROW_HEIGHT = 110

const asList = (value: unknown): string[] | undefined =>
  Array.isArray(value) ? value.map(String) : undefined

const median = (xs: number[]) => {
  const sorted = [...xs].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)] ?? 0
}

const HomeBanner: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const fm: Record<string, unknown> = fileData.frontmatter ?? {}
  const banner = fm.banner
  if (typeof banner !== "string" || banner === "") return null

  const pos = banner === "doodles" ? readPositions() : undefined
  if (!pos) {
    return <div class="home-banner" style={`background-image: url("${banner}");`} />
  }

  const root = pathToRoot(fileData.slug!)
  const says = asList(fm["doodle-says"]) ?? DEFAULT_SAYS
  const names = (asList(fm.doodles) ?? pos.order).filter((n) => pos.doodles[n])
  if (names.length === 0) return null

  // Gaps between neighbours, in original banner pixels. Doodles that were next to each other
  // in the banner keep their exact gap (which can be negative where they overlapped);
  // any other pair gets the typical gap.
  const originalGaps = pos.order
    .slice(1)
    .map((n, i) => pos.doodles[n].left - pos.doodles[pos.order[i]].right)
  const typicalGap = median(originalGaps)
  const gapBefore = names.map((n, i) => {
    if (i === 0) return n === pos.order[0] ? pos.doodles[n].left : typicalGap
    const prev = names[i - 1]
    const adjacent = pos.order.indexOf(n) === pos.order.indexOf(prev) + 1
    return adjacent ? pos.doodles[n].left - pos.doodles[prev].right : typicalGap
  })
  const last = names[names.length - 1]
  const gapAfter =
    last === pos.order[pos.order.length - 1]
      ? pos.bannerWidth - pos.doodles[last].right
      : typicalGap
  const widths = names.map((n) => pos.doodles[n].right - pos.doodles[n].left)
  const total = gapBefore.reduce((a, b) => a + b, 0) + widths.reduce((a, b) => a + b, 0) + gapAfter
  const pct = (v: number) => `${((v / total) * 100).toFixed(3)}%`

  return (
    <div class="doodle-row-wrap">
      <div
        class="doodle-row"
        data-says={JSON.stringify(says)}
        style={`max-width: ${Math.round((total * MAX_ROW_HEIGHT) / pos.bannerHeight)}px;`}
      >
        {names.map((n, i) => (
          <img
            class="doodle"
            src={joinSegments(root, "static", "doodles", `${n}.png`)}
            alt={n.replace(/-/g, " ")}
            title={n.replace(/-/g, " ")}
            draggable={false}
            style={`width: ${pct(widths[i])}; margin-left: ${pct(gapBefore[i])};`}
          />
        ))}
      </div>
      <span class="doodle-bubble" aria-hidden="true"></span>
    </div>
  )
}

HomeBanner.afterDOMLoaded = `
document.addEventListener("nav", () => {
  const row = document.querySelector(".doodle-row")
  const bubble = document.querySelector(".doodle-bubble")
  if (!row || !bubble) return
  let says = []
  try { says = JSON.parse(row.dataset.says || "[]") } catch {}
  const doodles = [...row.querySelectorAll(".doodle")]
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches
  let hideTimer

  const onClick = (e) => {
    const img = e.target.closest(".doodle")
    if (!img) return
    img.classList.remove("hop", "idle")
    void img.offsetWidth
    img.classList.add("hop")
    if (says.length === 0) return
    const r = img.getBoundingClientRect()
    const wrap = row.parentElement.getBoundingClientRect()
    bubble.textContent = says[Math.floor(Math.random() * says.length)]
    bubble.style.left = r.left - wrap.left + r.width / 2 + "px"
    bubble.style.top = r.top - wrap.top + "px"
    bubble.classList.add("show")
    clearTimeout(hideTimer)
    hideTimer = setTimeout(() => bubble.classList.remove("show"), 1300)
  }
  const onEnd = (e) => e.target.classList.remove("hop", "idle")

  // Every few seconds a random doodle fidgets by itself.
  const fidget = still ? undefined : setInterval(() => {
    const idle = doodles.filter((d) => !d.matches(":hover") && !d.classList.contains("hop"))
    const d = idle[Math.floor(Math.random() * idle.length)]
    if (d) d.classList.add("idle")
  }, 2500)

  row.addEventListener("click", onClick)
  row.addEventListener("animationend", onEnd)
  window.addCleanup(() => {
    row.removeEventListener("click", onClick)
    row.removeEventListener("animationend", onEnd)
    clearInterval(fidget)
    clearTimeout(hideTimer)
  })
})
`

HomeBanner.css = `
/* Single banner image: shown once (no tiling), scaled to the page width. */
.home-banner {
  width: 100%;
  aspect-ratio: 7047 / 566;
  max-height: 130px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

/* Doodle row */
.doodle-row-wrap {
  position: relative;
  padding: 18px 12px 4px;
}
.doodle-row {
  display: flex;
  align-items: flex-end;
  margin: 0 auto;
}
.doodle-row .doodle {
  flex: none;
  max-width: none;
  height: auto;
  margin: 0;
  border-radius: 0;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
  transform-origin: 50% 100%;
}
.doodle-row .doodle:hover { animation: doodle-wiggle 0.5s ease-in-out infinite; }
.doodle-row .doodle.hop { animation: doodle-hop 0.6s cubic-bezier(0.3, 1.6, 0.5, 1); }
.doodle-row .doodle.idle { animation: doodle-idle 1.2s ease-in-out; }

@keyframes doodle-wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-6deg); }
  75% { transform: rotate(6deg); }
}
@keyframes doodle-hop {
  0% { transform: translateY(0) scale(1, 1); }
  20% { transform: translateY(0) scale(1.08, 0.9); }
  50% { transform: translateY(-22%) scale(0.95, 1.06); }
  80% { transform: translateY(0) scale(1.05, 0.95); }
  100% { transform: translateY(0) scale(1, 1); }
}
@keyframes doodle-idle {
  0%, 100% { transform: rotate(0); }
  30% { transform: rotate(-3deg); }
  60% { transform: rotate(2deg); }
}

/* Speech bubble when a doodle is clicked */
.doodle-bubble {
  position: absolute;
  z-index: 5;
  pointer-events: none;
  font-family: "Gaegu", cursive;
  font-size: 1.15rem;
  color: var(--dark);
  background: var(--light);
  border: 2px solid var(--dark);
  border-radius: 14px;
  padding: 0 12px;
  white-space: nowrap;
  transform: translate(-50%, -100%) rotate(-3deg);
  opacity: 0;
  transition: opacity 0.2s;
}
.doodle-bubble.show { opacity: 1; }
.doodle-bubble::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -8px;
  width: 11px;
  height: 11px;
  background: var(--light);
  border-right: 2px solid var(--dark);
  border-bottom: 2px solid var(--dark);
  transform: translateX(-50%) rotate(45deg);
}

@media (prefers-reduced-motion: reduce) {
  .doodle-row .doodle:hover,
  .doodle-row .doodle.hop,
  .doodle-row .doodle.idle { animation: none; }
}
`

export default (() => HomeBanner) satisfies QuartzComponentConstructor
