import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Full-width doodle strip under the homepage top bar.
// The image comes from the page's frontmatter, e.g. `banner: /images/banner-n.png`.
const HomeBanner: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const src = fileData.frontmatter?.banner
  if (typeof src !== "string" || src === "") return null
  return <div class="home-banner" style={`background-image: url("${src}");`} />
}

HomeBanner.css = `
/* Shown once (no tiling), scaled to the page width. 7047 x 566 is the banner image size. */
.home-banner {
  width: 100%;
  aspect-ratio: 7047 / 566;
  max-height: 130px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
`

export default (() => HomeBanner) satisfies QuartzComponentConstructor
