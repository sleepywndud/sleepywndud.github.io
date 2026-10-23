// @ts-ignore
import script from "./scripts/examcountdown.inline"
import style from "./styles/examcountdown.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { exams } from "./data/exams"

// Exam countdown. Only appears on pages that contain <div class="exam-countdown-slot"></div>
// (the past-papers pages): the banner moves into that spot. It lists the exams for the
// standards on that page. Days are worked out in the browser, so no rebuild is needed.
const ExamCountdown: QuartzComponent = () => {
  // Shown in the order listed in data/exams.ts (by level).
  return (
    <div class="exam-countdown">
      <ul class="exam-countdown-list">
        {exams.map((e) => (
          <li
            class="exam-countdown-item"
            data-start={e.start}
            data-name={e.name}
            data-standards={e.standards.join(",")}
            hidden
          >
            <span class="exam-countdown-name">{e.name}</span>
            <span class="exam-countdown-date"></span>
            <span class="exam-countdown-left"></span>
          </li>
        ))}
      </ul>
    </div>
  )
}

ExamCountdown.afterDOMLoaded = script
ExamCountdown.css = style

export default (() => ExamCountdown) satisfies QuartzComponentConstructor
