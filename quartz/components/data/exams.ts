// NCEA exam dates for the countdown, listed by level (the banner keeps this order).
// Update once a year from
// https://www2.nzqa.govt.nz/ncea/exam-timetable-and-key-assessment-dates/exam-timetable/
// Times are NZ daylight time (+13:00). Morning = 9:30am, afternoon = 2:00pm.
//
// standards: the standard numbers this exam covers. The countdown on Past-Papers.md shows
// an exam when one of its standards has a heading on that page.

export interface Exam {
  name: string
  start: string
  standards: string[]
}

export const exams: Exam[] = [
  {
    name: "Level 1 Mathematics and Statistics",
    start: "2026-11-10T09:30:00+13:00",
    standards: ["91947"],
  },
  {
    name: "Level 2 Mathematics and Statistics",
    start: "2026-11-19T09:30:00+13:00",
    standards: ["91261", "91262"],
  },
  {
    name: "Level 3 Calculus",
    start: "2026-11-16T09:30:00+13:00",
    standards: ["91577", "91578", "91579"],
  },
  {
    name: "Scholarship Calculus",
    start: "2026-11-25T09:30:00+13:00",
    standards: ["93202"],
  },
  {
    name: "Level 2 Chemistry",
    start: "2026-11-16T14:00:00+13:00",
    standards: ["91164", "91165", "91166"],
  },
  {
    name: "Level 3 Chemistry",
    start: "2026-11-20T14:00:00+13:00",
    standards: ["91390", "91391", "91392"],
  },
  {
    name: "Level 2 Physics",
    start: "2026-11-18T14:00:00+13:00",
    standards: ["91170", "91171", "91173"],
  },
  {
    name: "Level 3 Physics",
    start: "2026-11-12T14:00:00+13:00",
    standards: ["91523", "91524", "91526"],
  },
]
