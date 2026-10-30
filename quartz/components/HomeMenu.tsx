import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// ☰ button in the homepage top bar. It slides the left sidebar (file explorer) in and out.
// On phones the explorer's own menu button is used instead (see custom.scss).
const HomeMenu: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button
      type="button"
      class={classNames(displayClass, "home-menu")}
      aria-label="Open sidebar"
      aria-expanded={false}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </button>
  )
}

HomeMenu.afterDOMLoaded = `
document.addEventListener("nav", () => {
  const button = document.querySelector(".home-menu")
  if (!button) return
  const sidebar = document.querySelector(".sidebar.left")

  const setOpen = (open) => {
    document.body.classList.toggle("home-drawer-open", open)
    button.setAttribute("aria-expanded", String(open))
  }
  const isOpen = () => document.body.classList.contains("home-drawer-open")

  const onButton = (e) => {
    e.stopPropagation()
    setOpen(!isOpen())
  }
  // Click outside the sidebar or press Escape to close it.
  const onDocument = (e) => {
    if (isOpen() && sidebar && !sidebar.contains(e.target)) setOpen(false)
  }
  const onKey = (e) => {
    if (e.key === "Escape") setOpen(false)
  }

  setOpen(false)
  button.addEventListener("click", onButton)
  document.addEventListener("click", onDocument)
  document.addEventListener("keydown", onKey)
  window.addCleanup(() => {
    button.removeEventListener("click", onButton)
    document.removeEventListener("click", onDocument)
    document.removeEventListener("keydown", onKey)
    document.body.classList.remove("home-drawer-open")
  })
})
`

HomeMenu.css = `
.home-menu {
  display: flex;
  align-items: center;
  padding: 4px;
  margin: 0;
  border: none;
  background: none;
  color: var(--darkgray);
  cursor: pointer;
}
.home-menu:hover {
  color: var(--secondary);
}
`

export default (() => HomeMenu) satisfies QuartzComponentConstructor
