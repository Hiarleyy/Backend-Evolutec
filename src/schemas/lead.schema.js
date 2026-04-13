const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[0-9+()\s-]{8,}$/

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : ""
}

function validateContactLead(payload) {
  const errors = []
  const nome = normalizeString(payload.nome)
  const telefone = normalizeString(payload.telefone)
  const curso = normalizeString(payload.curso)
  const cidade = normalizeString(payload.cidade)
  const origem = normalizeString(payload.origem)
  const lgpdConsent = payload.lgpdConsent === true

  if (!nome) {
    errors.push("O campo nome é obrigatório.")
  }

  if (!telefone || !phoneRegex.test(telefone)) {
    errors.push("O campo telefone deve ter um formato válido.")
  }

  if (!curso) {
    errors.push("O campo curso é obrigatório.")
  }

  if (!cidade) {
    errors.push("O campo cidade é obrigatório.")
  }

  if (!lgpdConsent) {
    errors.push("O consentimento LGPD é obrigatório.")
  }

  if (!origem) {
    errors.push("O campo origem é obrigatório.")
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: {
      nome,
      telefone,
      curso,
      cidade,
      lgpdConsent,
      origem
    }
  }
}

function validateEbookLead(payload) {
  const errors = []
  const nome = normalizeString(payload.nome)
  const email = normalizeString(payload.email)
  const telefone = normalizeString(payload.telefone)
  const empresa = normalizeString(payload.empresa)
  const ebookTitulo = normalizeString(payload.ebookTitulo)
  const origem = normalizeString(payload.origem)
  const ebookId = Number(payload.ebookId)

  if (!nome) {
    errors.push("O campo nome é obrigatório.")
  }

  if (!email || !emailRegex.test(email)) {
    errors.push("O campo email deve ter um formato válido.")
  }

  if (!telefone || !phoneRegex.test(telefone)) {
    errors.push("O campo telefone deve ter um formato válido.")
  }

  if (!empresa) {
    errors.push("O campo empresa é obrigatório.")
  }

  if (!Number.isInteger(ebookId) || ebookId <= 0) {
    errors.push("O campo ebookId deve ser um número válido.")
  }

  if (!ebookTitulo) {
    errors.push("O campo ebookTitulo é obrigatório.")
  }

  if (!origem) {
    errors.push("O campo origem é obrigatório.")
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: {
      nome,
      email,
      telefone,
      empresa,
      ebookId,
      ebookTitulo,
      origem
    }
  }
}

module.exports = {
  validateContactLead,
  validateEbookLead
}