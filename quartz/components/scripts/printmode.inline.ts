// Before printing: switch to light theme and open every collapsed <details> and callout.
// After printing: put everything back the way it was.
let restore: (() => void) | null = null

function preparePrint() {
  if (restore) return
  const html = document.documentElement
  const theme = html.getAttribute("saved-theme")
  html.setAttribute("saved-theme", "light")

  const closedDetails = Array.from(document.querySelectorAll<HTMLDetailsElement>("article details:not([open])"))
  closedDetails.forEach((d) => (d.open = true))

  const collapsedCallouts = Array.from(document.querySelectorAll("article .callout.is-collapsed"))
  collapsedCallouts.forEach((c) => c.classList.remove("is-collapsed"))

  restore = () => {
    if (theme) html.setAttribute("saved-theme", theme)
    closedDetails.forEach((d) => (d.open = false))
    collapsedCallouts.forEach((c) => c.classList.add("is-collapsed"))
    restore = null
  }
}

function finishPrint() {
  restore?.()
}

window.addEventListener("beforeprint", preparePrint)
window.addEventListener("afterprint", finishPrint)
