// @ts-ignore
import script from "./scripts/printmode.inline"
import style from "./styles/printmode.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Makes notes print cleanly (Ctrl/Cmd+P): only the note itself, light theme,
// with collapsed sections opened. The page goes back to normal after printing.
const PrintMode: QuartzComponent = () => null

PrintMode.afterDOMLoaded = script
PrintMode.css = style

export default (() => PrintMode) satisfies QuartzComponentConstructor
