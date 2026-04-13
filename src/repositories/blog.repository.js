const prisma = require("../database/prisma-client")

async function findAllPosts() {
  return await prisma.blogPost.findMany({
    orderBy: {
      data: "desc"
    }
  })
}

async function findPostById(id) {
  return await prisma.blogPost.findUnique({
    where: { id: Number(id) }
  })
}

async function findPostBySlug(slug) {
  return await prisma.blogPost.findUnique({
    where: { slug }
  })
}

async function createPost(payload) {
  return await prisma.blogPost.create({
    data: payload
  })
}

async function updatePostById(id, payload) {
  return await prisma.blogPost.update({
    where: { id: Number(id) },
    data: payload
  })
}

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  findPostBySlug,
  updatePostById
}