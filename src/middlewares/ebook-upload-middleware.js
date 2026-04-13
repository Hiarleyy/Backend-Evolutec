const multer = require("multer")
const path = require("path")
const {
  EBOOKS_DIR,
  ensureEbooksDirExists,
  buildStoredPdfName
} = require("../utils/ebook-storage")

ensureEbooksDirExists()

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, EBOOKS_DIR)
  },
  filename: (_req, file, cb) => {
    cb(null, buildStoredPdfName(file.originalname))
  }
})

function pdfOnlyFilter(_req, file, cb) {
  const extension = path.extname(file.originalname || "").toLowerCase()
  const isPdf = file.mimetype === "application/pdf" || extension === ".pdf"

  if (!isPdf) {
    return cb(new Error("Apenas arquivos PDF são permitidos."))
  }

  return cb(null, true)
}

const ebookUploadMiddleware = multer({
  storage,
  fileFilter: pdfOnlyFilter,
  limits: {
    fileSize: 20 * 1024 * 1024
  }
})

module.exports = ebookUploadMiddleware
