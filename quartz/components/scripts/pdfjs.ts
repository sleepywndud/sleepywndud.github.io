// pdf.js, loaded from a CDN the first time something on the page needs it.
// Shared by the in-site PDF viewer and the random question picker.

const PDFJS = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs"
const PDFJS_WORKER = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs"

// iPad Safari refuses canvases bigger than this.
export const MAX_CANVAS_PIXELS = 16_000_000

let pdfjsPromise: Promise<any> | null = null

export function loadPdfjs(): Promise<any> {
  if (!pdfjsPromise) {
    const url = PDFJS
    pdfjsPromise = import(/* @vite-ignore */ url).then((lib) => {
      // Workers can't load from another site directly, so start one through a tiny local module.
      const blob = new Blob([`import "${PDFJS_WORKER}";`], { type: "text/javascript" })
      lib.GlobalWorkerOptions.workerPort = new Worker(URL.createObjectURL(blob), { type: "module" })
      return lib
    })
    pdfjsPromise.catch(() => (pdfjsPromise = null))
  }
  return pdfjsPromise
}
