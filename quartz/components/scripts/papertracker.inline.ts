const STORAGE_PREFIX = "papertracker:"

function load(key: string): boolean {
  try {
    return localStorage.getItem(STORAGE_PREFIX + key) === "1"
  } catch {
    return false
  }
}

function save(key: string, done: boolean) {
  try {
    if (done) localStorage.setItem(STORAGE_PREFIX + key, "1")
    else localStorage.removeItem(STORAGE_PREFIX + key)
  } catch {
    // storage blocked (private window etc.) — ticks just won't persist
  }
}

function isPaperTable(table: HTMLTableElement): boolean {
  const headers = Array.from(table.querySelectorAll("thead th")).map((th) =>
    th.textContent?.trim().toLowerCase(),
  )
  return headers[0] === "year" && headers.includes("examination") && headers.includes("schedule")
}

function setupTable(table: HTMLTableElement) {
  if (table.dataset.paperTracker) return
  table.dataset.paperTracker = "1"
  table.classList.add("paper-table")

  const headRow = table.querySelector("thead tr")
  const doneTh = document.createElement("th")
  doneTh.textContent = "Done"
  doneTh.style.textAlign = "center"
  headRow?.appendChild(doneTh)

  // Progress badge goes in the <summary> of the surrounding <details>, or above the table.
  const badge = document.createElement("span")
  badge.className = "paper-progress"
  const summary = table.closest("details")?.querySelector(":scope > summary")
  if (summary) {
    summary.appendChild(badge)
  } else {
    const wrap = document.createElement("p")
    wrap.appendChild(badge)
    table.parentElement?.insertBefore(wrap, table)
  }

  const boxes: HTMLInputElement[] = []
  const update = () => {
    const done = boxes.filter((b) => b.checked).length
    badge.textContent = `${done}/${boxes.length}`
    badge.classList.toggle("complete", done === boxes.length && boxes.length > 0)
  }

  for (const row of table.querySelectorAll<HTMLTableRowElement>("tbody tr")) {
    // Key on the paper's link so ticks survive heading/order changes.
    const link = row.querySelector("a")?.getAttribute("href")
    const year = row.cells[0]?.textContent?.trim() ?? ""
    const key = link ? new URL(link, window.location.href).pathname : `${location.pathname}#${year}`

    const td = document.createElement("td")
    td.style.textAlign = "center"
    const box = document.createElement("input")
    box.type = "checkbox"
    box.className = "paper-check"
    box.setAttribute("aria-label", `Mark ${year} as done`)
    box.checked = load(key)
    row.classList.toggle("paper-done", box.checked)

    const onChange = () => {
      save(key, box.checked)
      row.classList.toggle("paper-done", box.checked)
      update()
    }
    box.addEventListener("change", onChange)
    window.addCleanup(() => box.removeEventListener("change", onChange))

    td.appendChild(box)
    row.appendChild(td)
    boxes.push(box)
  }

  update()
}

document.addEventListener("nav", () => {
  for (const table of document.querySelectorAll<HTMLTableElement>("article table")) {
    if (isPaperTable(table)) setupTable(table)
  }
})
