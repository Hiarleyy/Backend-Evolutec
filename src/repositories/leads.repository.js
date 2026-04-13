const prisma = require("../database/prisma-client")

async function createContactLead(payload) {
  return await prisma.lead.create({
    data: {
      type: "CONTACT",
      email: payload.email,
      name: payload.name,
      phone: payload.phone || null,
      message: payload.message || null
    }
  })
}

async function createEbookLead(payload) {
  return await prisma.lead.create({
    data: {
      type: "EBOOK",
      email: payload.email,
      name: payload.name,
      phone: payload.phone || null,
      ebookLead: {
        create: {
          ebookId: payload.ebookId,
          ebookTitulo: payload.ebookTitulo || null,
          downloadUrl: payload.downloadUrl || null
        }
      }
    },
    include: {
      ebookLead: true
    }
  })
}

module.exports = {
  createContactLead,
  createEbookLead
}