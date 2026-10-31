import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments, pathToRoot } from "../util/path"

// A doodle that peeks up from the bottom of the screen when you reach the end of a long page.
// Pictures come from quartz/static/doodles/peek/ (tightly cropped).
// Change what it says on a page with frontmatter, e.g.  peek-says: well done!
// Turn it off on a page with  peek: false

interface Options {
  doodles: string[]
  says: string[]
}

const defaultOptions: Options = {
  doodles: ["kat", "mari-catter", "xiao", "tajo", "superman", "hapy", "karee-catter"],
  says: ["you made it! ✿", "well done!", "nice reading!", "the end!", "go get that excellence"],
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const DoodlePeek: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const fm: Record<string, unknown> = fileData.frontmatter ?? {}
    if (fm.peek === false) return null
    const root = pathToRoot(fileData.slug!)
    const says = typeof fm["peek-says"] === "string" ? [fm["peek-says"]] : opts.says
    const pics = opts.doodles.map((d) =>
      joinSegments(root, "static", "doodles", "peek", `${d}.png`),
    )
    return (
      <div
        class="doodle-peek"
        aria-hidden="true"
        data-pics={JSON.stringify(pics)}
        data-says={JSON.stringify(says)}
      >
        <div class="doodle-peek-mover">
          <span class="doodle-peek-bubble"></span>
          <img alt="" />
        </div>
      </div>
    )
  }

  DoodlePeek.afterDOMLoaded = `
document.addEventListener("nav", () => {
  const peek = document.querySelector(".doodle-peek")
  if (!peek) return
  const img = peek.querySelector("img")
  const bubble = peek.querySelector(".doodle-peek-bubble")
  const pick = (list) => list[Math.floor(Math.random() * list.length)]
  let pics = [], says = []
  try { pics = JSON.parse(peek.dataset.pics); says = JSON.parse(peek.dataset.says) } catch {}
  if (pics.length === 0) return

  // A new random doodle and line each time a page loads.
  img.src = pick(pics)
  bubble.textContent = pick(says)

  // Only on pages that are long enough to scroll through.
  const isLong = () => document.documentElement.scrollHeight > window.innerHeight * 1.8
  const atBottom = () =>
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80
  const update = () => peek.classList.toggle("up", isLong() && atBottom())

  peek.classList.remove("up")
  window.addEventListener("scroll", update, { passive: true })
  window.addEventListener("resize", update)
  window.addCleanup(() => {
    window.removeEventListener("scroll", update)
    window.removeEventListener("resize", update)
  })
})
`

  DoodlePeek.css = `
/* Sits just below the bottom edge of the screen, so the edge hides its legs. */
.doodle-peek {
  position: fixed;
  right: 8%;
  bottom: 0;
  z-index: 20;
  width: 150px;
  pointer-events: none;
}
.doodle-peek-mover {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  transform: translateY(110%);
  transition: transform 0.55s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.doodle-peek.up .doodle-peek-mover {
  transform: translateY(35%);
}
.doodle-peek img {
  display: block;
  width: 100%;
  margin: 0;
  border-radius: 0;
}
.doodle-peek-bubble {
  position: absolute;
  left: 35%;
  top: -46px;
  font-family: "Gaegu", cursive;
  font-size: 1.1rem;
  color: var(--dark);
  background: var(--light);
  border: 2px solid var(--dark);
  border-radius: 14px;
  padding: 0 12px;
  white-space: nowrap;
  transform: translateX(-50%) rotate(-4deg);
  opacity: 0;
  transition: opacity 0.2s;
}
.doodle-peek.up .doodle-peek-bubble {
  opacity: 1;
  transition-delay: 0.45s;
}
.doodle-peek-bubble::after {
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
@media (max-width: 800px) {
  .doodle-peek { width: 110px; right: 6%; }
}
@media (prefers-reduced-motion: reduce) {
  .doodle-peek-mover, .doodle-peek-bubble { transition: none; }
}
`

  return DoodlePeek
}) satisfies QuartzComponentConstructor
