const fs = require("fs")
const path = require("path")

const EBOOKS_DIR = path.resolve(process.cwd(), "ebooks")

function ensureEbooksDirExists() {
  fs.mkdirSync(EBOOKS_DIR, { recursive: true })
}

function buildStoredPdfName(originalname = "ebook.pdf") {
  const ext = path.extname(originalname).toLowerCase() || ".pdf"
  const base = path.basename(originalname, ext)
  const sanitizedBase = String(base)
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "ebook"

  return `${Date.now()}-${sanitizedBase}${ext === ".pdf" ? ext : ".pdf"}`
}

function resolveEbookFilePath(caminho) {
  const safeName = path.basename(String(caminho || ""))
  return path.join(EBOOKS_DIR, safeName)
}

module.exports = {
  EBOOKS_DIR,
  ensureEbooksDirExists,
  buildStoredPdfName,
  resolveEbookFilePath
}
