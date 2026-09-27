import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

export default ((_opts?: unknown) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          Copyright (c) {year} Juyoung Park.<br />
          All rights reserved.
        </p>
        <br/>
        <ul>
          <li>
            <a href="/Privacy-Policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/CONTRIBUTING">Contributing</a>
          </li>
        </ul>
        <img src="/images/banner-n.png" alt="" class="footer-banner" />
        <br/>
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
