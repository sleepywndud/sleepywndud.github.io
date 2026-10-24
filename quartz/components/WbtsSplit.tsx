// @ts-ignore
import script from "./scripts/wbtssplit.inline"
import styles from "./styles/wbtssplit.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Sidebar button that opens WBTS (the scribble pad from wndx2.github.io)
// in a split screen next to the notes.
const WbtsSplit: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button
      class={classNames(displayClass, "wbts-toggle")}
      aria-label="Split screen with WBTS"
      aria-pressed="false"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <title>Split screen with WBTS</title>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="12" y1="4" x2="12" y2="20" />
        <path d="M14.5 15.5c1-2.5 2-3.5 2.5-2s1 1.5 2-0.5" />
      </svg>
    </button>
  )
}

WbtsSplit.afterDOMLoaded = script
WbtsSplit.css = styles

export default (() => WbtsSplit) satisfies QuartzComponentConstructor
