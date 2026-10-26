import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { FullPageLayout } from "../../cfg"
import { FilePath, FullSlug } from "../../util/path"
import { BuildCtx } from "../../util/ctx"
import { ProcessedContent } from "../vfile"
import { StaticResources } from "../../util/resources"
import { sharedPageComponents } from "../../../quartz.layout"
import {
  NotFound,
  Content,
  ArticleTitle,
  PageTitle,
  Search,
  Darkmode,
  Flex,
} from "../../components"
import { defaultProcessedContent } from "../vfile"
import { write } from "./helpers"
import { i18n } from "../../i18n"
import { Root, Element } from "hast"
import { visit } from "unist-util-visit"

// The 404 page is served at any missing URL (e.g. /a/b/c), so relative links
// like "./Past-Papers" would break. Turn them into links from the site root.
function makeLinksAbsolute(tree: Root, baseDir: string): Root {
  const copy = structuredClone(tree)
  visit(copy, "element", (node: Element) => {
    for (const attr of ["href", "src"]) {
      const value = node.properties?.[attr]
      if (typeof value === "string" && value.startsWith("./")) {
        node.properties[attr] = baseDir + value.slice(2)
      }
    }
  })
  return copy
}

export const NotFoundPage: QuartzEmitterPlugin = () => {
  // fallback when content/404.md doesn't exist
  const fallbackLayout: FullPageLayout = {
    ...sharedPageComponents,
    pageBody: NotFound(),
    beforeBody: [],
    // search bar so lost visitors can find what they were looking for
    left: [
      PageTitle(),
      Flex({ components: [{ Component: Search(), grow: true }, { Component: Darkmode() }] }),
    ],
    right: [],
  }

  // used when content/404.md exists: renders that note
  const markdownLayout: FullPageLayout = {
    ...fallbackLayout,
    pageBody: Content(),
    beforeBody: [ArticleTitle()],
  }

  const Body = BodyConstructor()

  async function* emit404(
    ctx: BuildCtx,
    content: ProcessedContent[],
    resources: StaticResources,
  ): AsyncGenerator<FilePath> {
    const cfg = ctx.cfg.configuration
    const slug = "404" as FullSlug

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const externalResources = pageResources(path, resources)

    const note = content.find(([, file]) => file.data.slug === slug)
    let tree: Root
    let fileData
    let layout: FullPageLayout
    if (note) {
      tree = makeLinksAbsolute(note[0] as Root, path)
      fileData = note[1].data
      layout = markdownLayout
    } else {
      const notFound = i18n(cfg.locale).pages.error.title
      const [defaultTree, vfile] = defaultProcessedContent({
        slug,
        text: notFound,
        description: notFound,
        frontmatter: { title: notFound, tags: [] },
      })
      tree = defaultTree as Root
      fileData = vfile.data
      layout = fallbackLayout
    }

    const componentData: QuartzComponentProps = {
      ctx,
      fileData,
      externalResources,
      cfg,
      children: [],
      tree,
      allFiles: [],
    }

    yield write({
      ctx,
      content: renderPage(cfg, slug, componentData, layout, externalResources),
      slug,
      ext: ".html",
    })
  }

  return {
    name: "404Page",
    getQuartzComponents() {
      const { head, footer, left } = fallbackLayout
      return [
        head,
        Body,
        fallbackLayout.pageBody,
        markdownLayout.pageBody,
        ...markdownLayout.beforeBody,
        ...left,
        footer,
      ]
    },
    async *emit(ctx, content, resources) {
      yield* emit404(ctx, content, resources)
    },
    // rebuild the 404 page when content/404.md changes during `--serve`
    async *partialEmit(ctx, content, resources, changeEvents) {
      if (changeEvents.some((e) => e.file?.data.slug === "404" || e.path?.endsWith("404.md"))) {
        yield* emit404(ctx, content, resources)
      }
    },
  }
}
