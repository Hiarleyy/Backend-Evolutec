const prisma = require("../database/prisma-client")

async function findAllEbooks() {
  return await prisma.ebook.findMany()
}

async function findEbookById(id) {
  return await prisma.ebook.findUnique({
    where: { id: Number(id) }
  })
}

async function findEbookBySlug(slug) {
  return await prisma.ebook.findUnique({
    where: { slug }
  })
}

async function findEbookByCaminho(caminho) {
  return await prisma.ebook.findFirst({
    where: { caminho }
  })
}

async function createEbook(payload) {
  return await prisma.ebook.create({
    data: payload
  })
}

async function updateEbookById(id, payload) {
  return await prisma.ebook.update({
    where: { id: Number(id) },
    data: payload
  })
}

module.exports = {
  createEbook,
  findAllEbooks,
  findEbookByCaminho,
  findEbookById,
  findEbookBySlug,
  updateEbookById
}