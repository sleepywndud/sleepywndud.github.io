import { promises as fs } from "fs"
import path from "path"
import { SatoriOptions } from "satori/wasm"
import { GlobalConfiguration } from "../cfg"
import { QuartzPluginData } from "../plugins/vfile"
import { JSXInternal } from "preact/src/jsx"
import { FontSpecification, getFontSpecificationName, ThemeKey } from "./theme"
import { joinSegments, QUARTZ } from "./path"
import { formatDate, getDate } from "../components/Date"
import readingTime from "reading-time"
import { i18n } from "../i18n"

export async function getSatoriFonts(
  headerFont: FontSpecification,
  bodyFont: FontSpecification
) {
  const snProRegularPath = joinSegments(QUARTZ, "static", "fonts", "SNPro-Regular.ttf")
  const snProBoldPath = joinSegments(QUARTZ, "static", "fonts", "SNPro-Bold.ttf")
  const snProItalicPath = joinSegments(QUARTZ, "static", "fonts", "SNPro-Italic.ttf")

  const [regularData, boldData, italicData] = await Promise.all([
    fs.readFile(path.resolve(snProRegularPath)),
    fs.readFile(path.resolve(snProBoldPath)),
    fs.readFile(path.resolve(snProItalicPath)),
  ])

  const fonts: SatoriOptions["fonts"] = [
    {
      name: "SN Pro",
      data: regularData,
      weight: 400,
      style: "normal",
    },
    {
      name: "SN Pro",
      data: italicData,
      weight: 400,
      style: "italic",
    },
    {
      name: "SN Pro",
      data: boldData,
      weight: 700,
      style: "normal",
    },
  ]

  return fonts
}

export type SocialImageOptions = {
  colorScheme: ThemeKey
  height: number
  width: number
  excludeRoot: boolean
  imageStructure: (
    options: ImageOptions & {
      userOpts: UserOpts
      iconBase64?: string
    }
  ) => JSXInternal.Element
}

export type UserOpts = Omit<SocialImageOptions, "imageStructure">

export type ImageOptions = {
  title: string
  description: string
  fonts: SatoriOptions["fonts"]
  cfg: GlobalConfiguration
  fileData: QuartzPluginData
}

export const defaultImage: SocialImageOptions["imageStructure"] = ({
  cfg,
  userOpts,
  title,
  description,
  fileData,
  iconBase64,
}) => {
  const { colorScheme } = userOpts

  const fontBreakPoint = 32
  const useSmallerFont = title.length > fontBreakPoint

  const rawDate = getDate(cfg, fileData)
  const date = rawDate ? formatDate(rawDate, cfg.locale) : null

  const { minutes } = readingTime(fileData.text ?? "")
  const readingTimeText = i18n(cfg.locale).components.contentMeta.readingTime({
    minutes: Math.ceil(minutes),
  })

  const tags = fileData.frontmatter?.tags ?? []

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: cfg.theme.colors[colorScheme].light,
        padding: "2.5rem",
        fontFamily: "SN Pro",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        {iconBase64 && (
          <img
            src={iconBase64}
            width={56}
            height={56}
            style={{ borderRadius: "50%" }}
          />
        )}

        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: cfg.theme.colors[colorScheme].gray,
            fontFamily: "SN Pro",
          }}
        >
          {cfg.baseUrl}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: useSmallerFont ? 64 : 72,
            fontFamily: "SN Pro",
            fontWeight: 700,
            color: cfg.theme.colors[colorScheme].dark,
            lineHeight: 1.2,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          fontSize: 36,
          color: cfg.theme.colors[colorScheme].darkgray,
          lineHeight: 1.4,
        }}
      >
        <p
          style={{
            margin: 0,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "2rem",
          paddingTop: "2rem",
          borderTop: `1px solid ${cfg.theme.colors[colorScheme].lightgray}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            color: cfg.theme.colors[colorScheme].gray,
            fontSize: 28,
          }}
        >
          {date && <div>{date}</div>}

          <div>{readingTimeText}</div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            maxWidth: "60%",
          }}
        >
          {tags.slice(0, 3).map((tag: string) => (
            <div
              style={{
                display: "flex",
                padding: "0.5rem 1rem",
                backgroundColor: cfg.theme.colors[colorScheme].highlight,
                color: cfg.theme.colors[colorScheme].secondary,
                borderRadius: "10px",
                fontSize: 24,
              }}
            >
              #{tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

