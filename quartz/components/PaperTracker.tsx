// @ts-ignore
import script from "./scripts/papertracker.inline"
import style from "./styles/papertracker.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Adds a "Done" checkbox to every past-paper table (Year | Examination | Schedule).
// Progress is saved in the visitor's browser only.
const PaperTracker: QuartzComponent = () => null

PaperTracker.afterDOMLoaded = script
PaperTracker.css = style

export default (() => PaperTracker) satisfies QuartzComponentConstructor
