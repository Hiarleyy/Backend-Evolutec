const blogRepository = require("../repositories/blog.repository")
const AppError = require("../error/app-error")

function applyBlogFilters(posts, filters) {
  const tag = typeof filters.tag === "string" ? filters.tag.trim().toLowerCase() : ""
  const destaque = typeof filters.destaque === "string" ? filters.destaque.trim().toLowerCase() : ""
  const search = typeof filters.search === "string" ? filters.search.trim().toLowerCase() : ""

  return posts.filter((post) => {
    const postTags = Array.isArray(post.tags) ? post.tags.map((currentTag) => String(currentTag).toLowerCase()) : []
    const title = String(post.titulo || "").toLowerCase()
    const subtitle = String(post.subtitulo || "").toLowerCase()

    if (tag && !postTags.includes(tag)) {
      return false
    }

    if (destaque && String(Boolean(post.destaque)) !== destaque) {
      return false
    }

    if (search && !`${title} ${subtitle}`.includes(search)) {
      return false
    }

    return true
  })
}

async function listPosts(filters = {}) {
  const posts = await blogRepository.findAllPosts()
  return applyBlogFilters(posts, filters)
}

async function getPostByIdOrSlug(identifier) {
  const numericId = Number(identifier)

  if (Number.isInteger(numericId) && String(numericId) === String(identifier).trim()) {
    return await blogRepository.findPostById(numericId)
  }

  return await blogRepository.findPostBySlug(identifier)
}

async function createPost(payload) {
  const existingPost = await blogRepository.findPostBySlug(payload.slug)

  if (existingPost) {
    throw new AppError("Já existe um post com este slug.", 409)
  }

  return await blogRepository.createPost(payload)
}

async function updatePostByIdentifier(identifier, payload) {
  const existingPost = await getPostByIdOrSlug(identifier)

  if (!existingPost) {
    throw new AppError("Post não encontrado.", 404)
  }

  if (payload.slug && payload.slug !== existingPost.slug) {
    const conflictPost = await blogRepository.findPostBySlug(payload.slug)

    if (conflictPost && conflictPost.id !== existingPost.id) {
      throw new AppError("Já existe um post com este slug.", 409)
    }
  }

  return await blogRepository.updatePostById(existingPost.id, payload)
}

module.exports = {
  createPost,
  getPostByIdOrSlug,
  listPosts,
  updatePostByIdentifier
}