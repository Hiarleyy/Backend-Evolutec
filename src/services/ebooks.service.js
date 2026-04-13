const ebooksRepository = require("../repositories/ebooks.repository")
const AppError = require("../error/app-error")

function applyEbookFilters(ebooks, filters) {
  const categoria = typeof filters.categoria === "string" ? filters.categoria.trim().toLowerCase() : ""
  const search = typeof filters.search === "string" ? filters.search.trim().toLowerCase() : ""

  return ebooks.filter((ebook) => {
    const ebookCategory = String(ebook.categoria || "").toLowerCase()
    const title = String(ebook.titulo || "").toLowerCase()
    const description = String(ebook.descricao || "").toLowerCase()

    if (categoria && ebookCategory !== categoria) {
      return false
    }

    if (search && !`${title} ${description}`.includes(search)) {
      return false
    }

    return true
  })
}

async function listEbooks(filters = {}) {
  const ebooks = await ebooksRepository.findAllEbooks()
  return applyEbookFilters(ebooks, filters)
}

async function getEbookById(id) {
  return await ebooksRepository.findEbookById(id)
}

async function getEbookByCaminho(caminho) {
  return await ebooksRepository.findEbookByCaminho(caminho)
}

async function createEbook(payload) {
  const existingEbook = await ebooksRepository.findEbookBySlug(payload.slug)

  if (existingEbook) {
    throw new AppError("Já existe um e-book com este slug.", 409)
  }

  return await ebooksRepository.createEbook(payload)
}

async function updateEbookById(id, payload) {
  const existingEbook = await ebooksRepository.findEbookById(id)

  if (!existingEbook) {
    throw new AppError("E-book não encontrado.", 404)
  }

  if (payload.slug && payload.slug !== existingEbook.slug) {
    const conflictEbook = await ebooksRepository.findEbookBySlug(payload.slug)

    if (conflictEbook && conflictEbook.id !== existingEbook.id) {
      throw new AppError("Já existe um e-book com este slug.", 409)
    }
  }

  return await ebooksRepository.updateEbookById(id, payload)
}

module.exports = {
  createEbook,
  getEbookByCaminho,
  getEbookById,
  listEbooks,
  updateEbookById
}