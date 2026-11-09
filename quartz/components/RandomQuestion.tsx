// @ts-ignore
import script from "./scripts/randomquestion.inline"
import style from "./styles/randomquestion.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { TOPICS } from "./data/l3excellence"

const total = TOPICS.reduce((n, t) => n + t.questions.length, 0)

// Pulls a random excellence question out of the three collated L3 PDFs
// (91577 Complex Numbers, 91578 Differentiation, 91579 Integration) and draws
// just the question, with no ruled answer space under it.
//
// Only appears on pages that contain <div class="random-question-slot"></div>;
// the picker moves into that spot. WBTS can be split-screened next to it, either
// from the sidebar button or the one in the picker.
const RandomQuestion: QuartzComponent = () => {
  return (
    <div class="randomq">
      <div class="randomq-controls">
        <div class="randomq-topics" role="group" aria-label="Which standards to pull from">
          {TOPICS.map((t) => (
            <button
              class="randomq-topic"
              data-topic={t.key}
              aria-pressed="true"
              title={`${t.standard} ${t.name} — ${t.questions.length} questions`}
            >
              <span class="randomq-topic-name">{t.short}</span>
              <span class="randomq-topic-std">{t.standard}</span>
            </button>
          ))}
        </div>
        <div class="randomq-buttons">
          <button class="randomq-pull">Pull a question</button>
          <button
            class="randomq-wbts"
            title="Split screen with WBTS"
            aria-label="Split screen with WBTS"
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
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <line x1="12" y1="4" x2="12" y2="20" />
              <path d="M14.5 15.5c1-2.5 2-3.5 2.5-2s1 1.5 2-0.5" />
            </svg>
            <span>WBTS</span>
          </button>
        </div>
      </div>

      <p class="randomq-empty">
        {total} excellence questions, 2013–2025. Press the button and one of them turns up.
      </p>

      <div class="randomq-stage" hidden>
        <div class="randomq-head">
          <span class="randomq-label"></span>
          <span class="randomq-progress"></span>
        </div>
        <div class="randomq-sheet" aria-live="polite"></div>
        <div class="randomq-foot">
          <a class="randomq-link" data-kind="paper">
            Full paper
          </a>
          <a class="randomq-link" data-kind="answers">
            Answer schedule
          </a>
          <a class="randomq-link" data-kind="collated">
            All of these questions
          </a>
          <button class="randomq-reset" title="Start the pile of unseen questions again">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

RandomQuestion.afterDOMLoaded = script
RandomQuestion.css = style

export default (() => RandomQuestion) satisfies QuartzComponentConstructor
