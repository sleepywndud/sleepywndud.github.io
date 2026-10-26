import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint not-found">
      <h1>404: Syntax Error</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <img src={`${baseDir}images/so-simple.webp`} alt="Calculator showing SYNTAX Error" />
      <p>Try the search bar, or head somewhere safe:</p>
      <ul>
        <li>
          <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
        </li>
        <li>
          <a href={`${baseDir}Past-Papers`}>Maths &amp; Calculus past papers</a>
        </li>
      </ul>
    </article>
  )
}

NotFound.css = `
.not-found img {
  display: block;
  max-width: min(100%, 360px);
  margin: 1.5rem auto;
}
`

export default (() => NotFound) satisfies QuartzComponentConstructor
