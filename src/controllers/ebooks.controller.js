const ebooksService = require("../services/ebooks.service")
const AppError = require("../error/app-error")
const fs = require("fs")
const {
  validateCreateEbookPayload,
  validateUpdateEbookPayload
} = require("../schemas/content.schema")
const { resolveEbookFilePath } = require("../utils/ebook-storage")

async function listEbooks(req, res, next) {
  try {
    const ebooks = await ebooksService.listEbooks(req.query)

    return res.status(200).json({
      data: ebooks,
      count: ebooks.length
    })
  } catch (error) {
    return next(error)
  }
}

async function getEbookById(req, res, next) {
  try {
    const ebook = await ebooksService.getEbookById(req.params.id)

    if (!ebook) {
      throw new AppError("E-book não encontrado.", 404)
    }

    return res.status(200).json({
      data: ebook
    })
  } catch (error) {
    return next(error)
  }
}

async function createEbook(req, res, next) {
  try {
    const payload = {
      ...req.body,
      caminho: req.file ? req.file.filename : req.body.caminho,
      downloadUrl: req.file ? `/api/ebooks/download/${req.file.filename}` : req.body.downloadUrl
    }
    const validation = validateCreateEbookPayload(payload)

    if (!validation.isValid) {
      throw new AppError("Payload inválido para criação de e-book.", 400, validation.errors)
    }

    const createdEbook = await ebooksService.createEbook(validation.value)

    return res.status(201).json({
      data: createdEbook
    })
  } catch (error) {
    return next(error)
  }
}

async function updateEbook(req, res, next) {
  try {
    const payload = {
      ...req.body
    }

    if (req.file) {
      payload.caminho = req.file.filename
      payload.downloadUrl = `/api/ebooks/download/${req.file.filename}`
    }

    const validation = validateUpdateEbookPayload(payload)

    if (!validation.isValid) {
      throw new AppError("Payload inválido para atualização de e-book.", 400, validation.errors)
    }

    const updatedEbook = await ebooksService.updateEbookById(req.params.id, validation.value)

    return res.status(200).json({
      data: updatedEbook
    })
  } catch (error) {
    return next(error)
  }
}

async function downloadEbook(req, res, next) {
  try {
    const caminho = String(req.params.caminho || "")
    const ebook = await ebooksService.getEbookByCaminho(caminho)

    if (!ebook) {
      throw new AppError("E-book não encontrado para este caminho.", 404)
    }

    const filePath = resolveEbookFilePath(ebook.caminho)

    if (!fs.existsSync(filePath)) {
      throw new AppError("Arquivo do e-book não encontrado no servidor.", 404)
    }

    return res.download(filePath, `${ebook.slug}.pdf`)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createEbook,
  downloadEbook,
  getEbookById,
  listEbooks,
  updateEbook
}