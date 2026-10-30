import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { findAndReplace } from "mdast-util-find-and-replace"
import { FullSlug, joinSegments, pathToRoot } from "../../util/path"

// Inline grade icons, written like emoji: :merit:, :excellence:, :e8:, ...
// Icons live in quartz/static/grades/.
const GRADES: Record<string, { file: string; label: string }> = {
  "not-achieved": { file: "notachieved", label: "Not Achieved" },
  notachieved: { file: "notachieved", label: "Not Achieved" },
  achieved: { file: "achieved", label: "Achieved" },
  merit: { file: "merit", label: "Merit" },
  excellence: { file: "excellence", label: "Excellence" },
  n1: { file: "n1", label: "N1" },
  n2: { file: "n2", label: "N2" },
  a3: { file: "a3", label: "A3" },
  a4: { file: "a4", label: "A4" },
  m5: { file: "m5", label: "M5" },
  m6: { file: "m6", label: "M6" },
  e7: { file: "e7", label: "E7" },
  e8: { file: "e8", label: "E8" },
}

const gradeRegex = new RegExp(`:(${Object.keys(GRADES).join("|")}):`, "gi")

// :heart: becomes a heart icon in the theme's accent colour (styled in custom.scss).
const heartRegex = /:heart:/gi

export const GradeEmoji: QuartzTransformerPlugin = () => ({
  name: "GradeEmoji",
  markdownPlugins() {
    return [
      () => (tree: Root, file) => {
        const root = pathToRoot(file.data.slug as FullSlug)
        findAndReplace(tree, [
          [
            gradeRegex,
            (_match: string, name: string) => {
              const grade = GRADES[name.toLowerCase()]
              const src = joinSegments(root, "static", "grades", `${grade.file}.png`)
              // Score icons (:n1: to :e8:) get an extra class so they can be sized separately.
              const isScore = /^[name]\d$/.test(grade.file)
              const cls = isScore ? "grade-emoji grade-score" : "grade-emoji"
              return {
                type: "html",
                value: `<img class="${cls}" src="${src}" alt="${grade.label}" title="${grade.label}">`,
              }
            },
          ],
          [
            heartRegex,
            () => ({
              type: "html",
              value: `<span class="heart-icon" role="img" aria-label="heart"></span>`,
            }),
          ],
        ])
      },
    ]
  },
})
