// @ts-ignore
import script from "./scripts/pdfviewer.inline"
import style from "./styles/pdfviewer.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Opens PDF links (past papers etc.) in a viewer inside the site, on the notes
// side, so WBTS can stay open next to it. Cmd/Ctrl-click still opens normally.
const PdfViewer: QuartzComponent = () => null

PdfViewer.afterDOMLoaded = script
PdfViewer.css = style

export default (() => PdfViewer) satisfies QuartzComponentConstructor
