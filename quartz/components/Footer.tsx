import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { joinSegments, pathToRoot } from "../util/path"

export default ((_opts?: unknown) => {
  const Footer: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const baseDir = pathToRoot(fileData.slug!)
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          Copyright (c) {year} Juyoung Park.<br />
          All rights reserved.
        </p>
        <br/>
        <table class="footer-links">
          <tbody>
            <tr>
              <td>
                <a href={joinSegments(baseDir, "Others/Terms-of-Service")}>Terms of Service</a>
              </td>
              <td>
                <a href={joinSegments(baseDir, "Others/Privacy-Policy")}>Privacy Policy</a>
              </td>
              <td>
                <a href={joinSegments(baseDir, "Others/CONTRIBUTING")}>Contributing</a>
              </td>
              <td>
                <a href={joinSegments(baseDir, "Others/History")}>History</a>
              </td>
            </tr>
          </tbody>
        </table>
        <img src="/images/banner-n.png" alt="" class="footer-banner" />
        <blockquote>
          <strong>
            ALL CONTENT CREATED BY JUYOUNG PARK IN THIS WEBSITE ARE LICENSED UNDER THE{" "}
            <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.txt">
              Creative Commons Attribution Non-Commercial No-Derivatives
            </a>{" "}
            (CC-BY-NC-ND) LICENSE.
          </strong>
        </blockquote>
        <p>
          Any inquiries, please email <code>juyoung.parkk8@gmail.com</code>, or send me a DM on Discord <code>wndx2</code>.
        </p>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
