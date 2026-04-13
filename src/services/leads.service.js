const AppError = require("../error/app-error")
const { validateContactLead, validateEbookLead } = require("../schemas/lead.schema")
const leadsRepository = require("../repositories/leads.repository")
const ebooksService = require("./ebooks.service")

async function createContactLead(payload) {
  const validation = validateContactLead(payload)

  if (!validation.isValid) {
    throw new AppError("Não foi possível salvar o lead de contato.", 400, validation.errors)
  }

  return await leadsRepository.createContactLead(validation.value)
}

async function createEbookLead(payload) {
  const validation = validateEbookLead(payload)

  if (!validation.isValid) {
    throw new AppError("Não foi possível salvar o lead do e-book.", 400, validation.errors)
  }

  const ebook = await ebooksService.getEbookById(validation.value.ebookId)

  if (!ebook) {
    throw new AppError("E-book não encontrado.", 404)
  }

  return await leadsRepository.createEbookLead({
    ...validation.value,
    ebookTitulo: validation.value.ebookTitulo || ebook.titulo,
    downloadUrl: ebook.downloadUrl
  })
}

module.exports = {
  createContactLead,
  createEbookLead
}