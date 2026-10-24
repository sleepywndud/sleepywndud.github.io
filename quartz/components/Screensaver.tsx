// @ts-ignore
import script from "./scripts/screensaver.inline"
import styles from "./styles/screensaver.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Sidebar button that opens a full-screen clock (ported from wndx2.github.io).
const Screensaver: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button class={classNames(displayClass, "screensaver-toggle")} aria-label="Screensaver">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <title>Screensaver</title>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 14" />
      </svg>
    </button>
  )
}

Screensaver.afterDOMLoaded = script
Screensaver.css = styles

export default (() => Screensaver) satisfies QuartzComponentConstructor
