function normalizeString(value) {
  return typeof value === "string" ? value.trim() : ""
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => normalizeString(item))
    .filter((item) => item.length > 0)
}

function hasOwn(payload, key) {
  return Object.prototype.hasOwnProperty.call(payload, key)
}

function validateCreateCoursePayload(payload) {
  const errors = []
  const value = {
    slug: normalizeString(payload.slug),
    title: normalizeString(payload.title),
    category: normalizeString(payload.category),
    image: normalizeString(payload.image),
    mode: normalizeString(payload.mode),
    duration: normalizeString(payload.duration),
    hours: Number(payload.hours),
    tag: normalizeString(payload.tag),
    description: normalizeString(payload.description),
    fullDescription: normalizeString(payload.fullDescription),
    objectives: normalizeStringArray(payload.objectives),
    curriculum: normalizeStringArray(payload.curriculum),
    careerOpportunities: normalizeStringArray(payload.careerOpportunities),
    requirements: normalizeStringArray(payload.requirements),
    certificationType: normalizeString(payload.certificationType),
    salary: normalizeString(payload.salary),
    marketInfo: normalizeString(payload.marketInfo),
    destaque: Boolean(payload.destaque)
  }

  if (!value.slug) {
    errors.push("O campo slug é obrigatório.")
  }

  if (!value.title) {
    errors.push("O campo title é obrigatório.")
  }

  if (!value.category) {
    errors.push("O campo category é obrigatório.")
  }

  if (!value.image) {
    errors.push("O campo image é obrigatório.")
  }

  if (!value.mode) {
    errors.push("O campo mode é obrigatório.")
  }

  if (!value.duration) {
    errors.push("O campo duration é obrigatório.")
  }

  if (!Number.isInteger(value.hours) || value.hours <= 0) {
    errors.push("O campo hours deve ser um número inteiro maior que zero.")
  }

  if (!value.tag) {
    errors.push("O campo tag é obrigatório.")
  }

  if (!value.description) {
    errors.push("O campo description é obrigatório.")
  }

  if (!value.fullDescription) {
    errors.push("O campo fullDescription é obrigatório.")
  }

  if (value.objectives.length === 0) {
    errors.push("O campo objectives deve ter ao menos um item.")
  }

  if (value.curriculum.length === 0) {
    errors.push("O campo curriculum deve ter ao menos um item.")
  }

  if (value.careerOpportunities.length === 0) {
    errors.push("O campo careerOpportunities deve ter ao menos um item.")
  }

  if (value.requirements.length === 0) {
    errors.push("O campo requirements deve ter ao menos um item.")
  }

  if (!value.certificationType) {
    errors.push("O campo certificationType é obrigatório.")
  }

  if (!value.salary) {
    errors.push("O campo salary é obrigatório.")
  }

  if (!value.marketInfo) {
    errors.push("O campo marketInfo é obrigatório.")
  }

  return {
    isValid: errors.length === 0,
    errors,
    value
  }
}

function validateCreateBlogPostPayload(payload) {
  const errors = []
  const value = {
    slug: normalizeString(payload.slug),
    imagem: normalizeString(payload.imagem),
    tags: normalizeStringArray(payload.tags),
    titulo: normalizeString(payload.titulo),
    subtitulo: normalizeString(payload.subtitulo),
    data: normalizeString(payload.data),
    conteudo: normalizeString(payload.conteudo),
    destaque: Boolean(payload.destaque)
  }

  if (!value.slug) {
    errors.push("O campo slug é obrigatório.")
  }

  if (!value.imagem) {
    errors.push("O campo imagem é obrigatório.")
  }

  if (value.tags.length === 0) {
    errors.push("O campo tags deve ter ao menos um item.")
  }

  if (!value.titulo) {
    errors.push("O campo titulo é obrigatório.")
  }

  if (!value.subtitulo) {
    errors.push("O campo subtitulo é obrigatório.")
  }

  if (!value.data) {
    errors.push("O campo data é obrigatório.")
  }

  if (!value.conteudo) {
    errors.push("O campo conteudo é obrigatório.")
  }

  return {
    isValid: errors.length === 0,
    errors,
    value
  }
}

function validateCreateEbookPayload(payload) {
  const errors = []
  const value = {
    slug: normalizeString(payload.slug),
    titulo: normalizeString(payload.titulo),
    descricao: normalizeString(payload.descricao),
    categoria: normalizeString(payload.categoria),
    capa: normalizeString(payload.capa),
    caminho: normalizeString(payload.caminho),
    downloadUrl: normalizeString(payload.downloadUrl)
  }

  if (!value.slug) {
    errors.push("O campo slug é obrigatório.")
  }

  if (!value.titulo) {
    errors.push("O campo titulo é obrigatório.")
  }

  if (!value.descricao) {
    errors.push("O campo descricao é obrigatório.")
  }

  if (!value.categoria) {
    errors.push("O campo categoria é obrigatório.")
  }

  if (!value.capa) {
    errors.push("O campo capa é obrigatório.")
  }

  if (!value.caminho && !value.downloadUrl) {
    errors.push("Informe um arquivo PDF enviado ou o campo downloadUrl.")
  }

  return {
    isValid: errors.length === 0,
    errors,
    value
  }
}

function validateUpdateCoursePayload(payload) {
  const errors = []
  const value = {}

  if (hasOwn(payload, "slug")) {
    value.slug = normalizeString(payload.slug)

    if (!value.slug) {
      errors.push("O campo slug não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "title")) {
    value.title = normalizeString(payload.title)

    if (!value.title) {
      errors.push("O campo title não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "category")) {
    value.category = normalizeString(payload.category)

    if (!value.category) {
      errors.push("O campo category não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "image")) {
    value.image = normalizeString(payload.image)

    if (!value.image) {
      errors.push("O campo image não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "mode")) {
    value.mode = normalizeString(payload.mode)

    if (!value.mode) {
      errors.push("O campo mode não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "duration")) {
    value.duration = normalizeString(payload.duration)

    if (!value.duration) {
      errors.push("O campo duration não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "hours")) {
    value.hours = Number(payload.hours)

    if (!Number.isInteger(value.hours) || value.hours <= 0) {
      errors.push("O campo hours deve ser um número inteiro maior que zero.")
    }
  }

  if (hasOwn(payload, "tag")) {
    value.tag = normalizeString(payload.tag)

    if (!value.tag) {
      errors.push("O campo tag não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "description")) {
    value.description = normalizeString(payload.description)

    if (!value.description) {
      errors.push("O campo description não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "fullDescription")) {
    value.fullDescription = normalizeString(payload.fullDescription)

    if (!value.fullDescription) {
      errors.push("O campo fullDescription não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "objectives")) {
    value.objectives = normalizeStringArray(payload.objectives)

    if (value.objectives.length === 0) {
      errors.push("O campo objectives deve ter ao menos um item.")
    }
  }

  if (hasOwn(payload, "curriculum")) {
    value.curriculum = normalizeStringArray(payload.curriculum)

    if (value.curriculum.length === 0) {
      errors.push("O campo curriculum deve ter ao menos um item.")
    }
  }

  if (hasOwn(payload, "careerOpportunities")) {
    value.careerOpportunities = normalizeStringArray(payload.careerOpportunities)

    if (value.careerOpportunities.length === 0) {
      errors.push("O campo careerOpportunities deve ter ao menos um item.")
    }
  }

  if (hasOwn(payload, "requirements")) {
    value.requirements = normalizeStringArray(payload.requirements)

    if (value.requirements.length === 0) {
      errors.push("O campo requirements deve ter ao menos um item.")
    }
  }

  if (hasOwn(payload, "certificationType")) {
    value.certificationType = normalizeString(payload.certificationType)

    if (!value.certificationType) {
      errors.push("O campo certificationType não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "salary")) {
    value.salary = normalizeString(payload.salary)

    if (!value.salary) {
      errors.push("O campo salary não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "marketInfo")) {
    value.marketInfo = normalizeString(payload.marketInfo)

    if (!value.marketInfo) {
      errors.push("O campo marketInfo não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "destaque")) {
    if (typeof payload.destaque !== "boolean") {
      errors.push("O campo destaque deve ser booleano.")
    } else {
      value.destaque = payload.destaque
    }
  }

  if (Object.keys(value).length === 0) {
    errors.push("Informe ao menos um campo para atualização.")
  }

  return {
    isValid: errors.length === 0,
    errors,
    value
  }
}

function validateUpdateBlogPostPayload(payload) {
  const errors = []
  const value = {}

  if (hasOwn(payload, "slug")) {
    value.slug = normalizeString(payload.slug)

    if (!value.slug) {
      errors.push("O campo slug não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "imagem")) {
    value.imagem = normalizeString(payload.imagem)

    if (!value.imagem) {
      errors.push("O campo imagem não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "tags")) {
    value.tags = normalizeStringArray(payload.tags)

    if (value.tags.length === 0) {
      errors.push("O campo tags deve ter ao menos um item.")
    }
  }

  if (hasOwn(payload, "titulo")) {
    value.titulo = normalizeString(payload.titulo)

    if (!value.titulo) {
      errors.push("O campo titulo não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "subtitulo")) {
    value.subtitulo = normalizeString(payload.subtitulo)

    if (!value.subtitulo) {
      errors.push("O campo subtitulo não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "data")) {
    value.data = normalizeString(payload.data)

    if (!value.data) {
      errors.push("O campo data não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "conteudo")) {
    value.conteudo = normalizeString(payload.conteudo)

    if (!value.conteudo) {
      errors.push("O campo conteudo não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "destaque")) {
    if (typeof payload.destaque !== "boolean") {
      errors.push("O campo destaque deve ser booleano.")
    } else {
      value.destaque = payload.destaque
    }
  }

  if (Object.keys(value).length === 0) {
    errors.push("Informe ao menos um campo para atualização.")
  }

  return {
    isValid: errors.length === 0,
    errors,
    value
  }
}

function validateUpdateEbookPayload(payload) {
  const errors = []
  const value = {}

  if (hasOwn(payload, "slug")) {
    value.slug = normalizeString(payload.slug)

    if (!value.slug) {
      errors.push("O campo slug não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "titulo")) {
    value.titulo = normalizeString(payload.titulo)

    if (!value.titulo) {
      errors.push("O campo titulo não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "descricao")) {
    value.descricao = normalizeString(payload.descricao)

    if (!value.descricao) {
      errors.push("O campo descricao não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "categoria")) {
    value.categoria = normalizeString(payload.categoria)

    if (!value.categoria) {
      errors.push("O campo categoria não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "capa")) {
    value.capa = normalizeString(payload.capa)

    if (!value.capa) {
      errors.push("O campo capa não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "downloadUrl")) {
    value.downloadUrl = normalizeString(payload.downloadUrl)

    if (!value.downloadUrl) {
      errors.push("O campo downloadUrl não pode ser vazio.")
    }
  }

  if (hasOwn(payload, "caminho")) {
    value.caminho = normalizeString(payload.caminho)

    if (!value.caminho) {
      errors.push("O campo caminho não pode ser vazio.")
    }
  }

  if (Object.keys(value).length === 0) {
    errors.push("Informe ao menos um campo para atualização.")
  }

  return {
    isValid: errors.length === 0,
    errors,
    value
  }
}

module.exports = {
  validateCreateBlogPostPayload,
  validateCreateCoursePayload,
  validateCreateEbookPayload,
  validateUpdateBlogPostPayload,
  validateUpdateCoursePayload,
  validateUpdateEbookPayload
}