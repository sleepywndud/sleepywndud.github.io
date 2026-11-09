// @ts-ignore
import script from "./scripts/randomquestion.inline"
import style from "./styles/randomquestion.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Pulls a random excellence question out of the three collated L3 PDFs
// (91577 Complex Numbers, 91578 Differentiation, 91579 Integration) and draws
// just the question, with no ruled answer space under it.
//
// Pages holding <div class="random-question-slot"></div> open it as a pane over
// the whole window, and get a button in that spot to open it again after closing.
// The pane leaves room for the WBTS pad, so the two can share the screen.
const RandomQuestion: QuartzComponent = () => null

RandomQuestion.afterDOMLoaded = script
RandomQuestion.css = style

export default (() => RandomQuestion) satisfies QuartzComponentConstructor
