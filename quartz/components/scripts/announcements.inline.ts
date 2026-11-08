// Loudspeaker button: inbox of announcements, each opening as a popup message.
// Which ones have been read is kept per browser; site data can be blocked or cleared,
// so every read and write is allowed to fail.

const READ_KEY = "wbts:announce:read"

function readIds(): Set<string> {
  try {
    const raw = localStorage.getItem(READ_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function writeIds(ids: Set<string>) {
  try {
    localStorage.setItem(READ_KEY, JSON.stringify([...ids]))
  } catch {
    /* ignore */
  }
}

document.addEventListener("nav", () => {
  const root = document.querySelector<HTMLElement>(".announce")
  if (!root) return

  const button = root.querySelector<HTMLButtonElement>(".announce-btn")!
  const badge = root.querySelector<HTMLElement>(".announce-badge")!
  const inbox = root.querySelector<HTMLElement>(".announce-inbox")!
  const empty = root.querySelector<HTMLElement>(".announce-empty")!
  const readAll = root.querySelector<HTMLButtonElement>(".announce-readall")!
  const backdrop = root.querySelector<HTMLElement>(".announce-backdrop")!
  const dialog = root.querySelector<HTMLElement>(".announce-msg")!
  const msgDate = root.querySelector<HTMLElement>(".announce-msg-date")!
  const msgTitle = root.querySelector<HTMLElement>(".announce-msg-title")!
  const msgBody = root.querySelector<HTMLElement>(".announce-msg-body")!
  const closeBtn = root.querySelector<HTMLButtonElement>(".announce-close")!

  // Drop anything past its "until" date. The date is the last day it shows.
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Pacific/Auckland" })
  const items = Array.from(root.querySelectorAll<HTMLElement>(".announce-item"))
  for (const item of items) {
    const until = item.dataset.until
    item.hidden = !!until && until < today
  }
  const live = items.filter((item) => !item.hidden)

  // No announcements left: no point showing the button at all.
  root.hidden = live.length === 0
  if (live.length === 0) return
  empty.hidden = true

  let read = readIds()

  function refresh() {
    let unread = 0
    for (const item of live) {
      const isRead = read.has(item.dataset.id!)
      item.classList.toggle("is-unread", !isRead)
      if (!isRead) unread++
    }
    badge.textContent = String(unread)
    badge.hidden = unread === 0
    button.classList.toggle("has-unread", unread > 0)
  }

  function markRead(id: string) {
    if (read.has(id)) return
    read.add(id)
    writeIds(read)
    refresh()
  }

  // ---- inbox -------------------------------------------------------------
  function setInbox(open: boolean) {
    inbox.hidden = !open
    button.setAttribute("aria-expanded", String(open))
  }

  button.addEventListener("click", (e) => {
    e.stopPropagation()
    setInbox(inbox.hidden)
  })

  // A click anywhere else closes the inbox (but not one inside it).
  document.addEventListener("click", (e) => {
    if (!inbox.hidden && !inbox.contains(e.target as Node)) setInbox(false)
  })

  readAll.addEventListener("click", (e) => {
    e.stopPropagation()
    for (const item of live) read.add(item.dataset.id!)
    writeIds(read)
    refresh()
  })

  // ---- message popup -----------------------------------------------------
  let lastFocused: HTMLElement | null = null

  function openMessage(item: HTMLElement) {
    const body = item.querySelector<HTMLTemplateElement>(".announce-body")!
    msgDate.textContent = item.querySelector(".announce-date")!.textContent
    msgTitle.textContent = item.querySelector(".announce-title")!.textContent
    msgBody.replaceChildren(body.content.cloneNode(true))
    lastFocused = document.activeElement as HTMLElement
    setInbox(false)
    backdrop.hidden = false
    const sbw = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty("--announce-sbw", `${sbw}px`)
    document.documentElement.classList.add("announce-locked")
    closeBtn.focus()
    markRead(item.dataset.id!)
  }

  function closeMessage() {
    backdrop.hidden = true
    document.documentElement.classList.remove("announce-locked")
    document.documentElement.style.removeProperty("--announce-sbw")
    lastFocused?.focus()
  }

  for (const item of live) {
    item.querySelector<HTMLButtonElement>(".announce-trigger")!.addEventListener("click", (e) => {
      e.stopPropagation()
      openMessage(item)
    })
  }

  closeBtn.addEventListener("click", closeMessage)
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeMessage()
  })

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return
    if (!backdrop.hidden) closeMessage()
    else if (!inbox.hidden) {
      setInbox(false)
      button.focus()
    }
  })

  // Keep focus inside the popup while it is open.
  dialog.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return
    const focusable = dialog.querySelectorAll<HTMLElement>("a[href], button")
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  })

  refresh()
})
