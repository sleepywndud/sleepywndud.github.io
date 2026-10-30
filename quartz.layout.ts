import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { QuartzComponent } from "./quartz/components/types"

// The homepage (content/index.md) is a landing page with no sidebars.
// These wrap a component so it only shows on the homepage, or everywhere except it.
const isHome = (slug?: string) => slug === "index"
const homeOnly = (component: QuartzComponent) =>
  Component.ConditionalRender({ component, condition: (page) => isHome(page.fileData.slug) })
const notHome = (component: QuartzComponent) =>
  Component.ConditionalRender({ component, condition: (page) => !isHome(page.fileData.slug) })

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  // Homepage top bar: menu, title, search and dark mode (other pages have these in the left sidebar).
  header: [
    homeOnly(Component.HomeMenu()),
    homeOnly(Component.PageTitle()),
    homeOnly(Component.Search()),
    homeOnly(Component.Darkmode()),
  ],
  afterBody: [Component.PaperTracker(), Component.PrintMode(), Component.PdfViewer()],
  footer: Component.Footer(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    homeOnly(Component.HomeBanner()),
    notHome(Component.Breadcrumbs()),
    notHome(Component.ArticleTitle()),
    notHome(Component.ContentMeta()),
    notHome(Component.TagList()),
    Component.ExamCountdown(),
  ],
  left: [
    notHome(Component.PageTitle()),
    notHome(Component.MobileOnly(Component.Spacer())),
    notHome(
      Component.Flex({
        components: [
          {
            Component: Component.Search(),
            grow: true,
          },
          { Component: Component.Darkmode() },
          { Component: Component.ReaderMode() },
          { Component: Component.Screensaver() },
          { Component: Component.WbtsSplit() },
        ],
      }),
    ),
    // On the homepage the explorer is the only thing in the left sidebar, which slides in from the ☰ button.
    Component.Explorer(),
  ],
  right: [
    notHome(Component.Graph()),
    notHome(Component.DesktopOnly(Component.TableOfContents())),
    notHome(Component.RecentNotes({ filter: (f) => f.slug !== "404" })),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.Screensaver() },
        { Component: Component.WbtsSplit() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
