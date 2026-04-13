const blogService = require("../services/blog.service")
const AppError = require("../error/app-error")
const {
  validateCreateBlogPostPayload,
  validateUpdateBlogPostPayload
} = require("../schemas/content.schema")

async function listPosts(req, res, next) {
  try {
    const posts = await blogService.listPosts(req.query)

    return res.status(200).json({
      data: posts,
      count: posts.length
    })
  } catch (error) {
    return next(error)
  }
}

async function getPostByIdOrSlug(req, res, next) {
  try {
    const post = await blogService.getPostByIdOrSlug(req.params.identifier)

    if (!post) {
      throw new AppError("Post não encontrado.", 404)
    }

    return res.status(200).json({
      data: post
    })
  } catch (error) {
    return next(error)
  }
}

async function createPost(req, res, next) {
  try {
    const validation = validateCreateBlogPostPayload(req.body)

    if (!validation.isValid) {
      throw new AppError("Payload inválido para criação de post.", 400, validation.errors)
    }

    const createdPost = await blogService.createPost(validation.value)

    return res.status(201).json({
      data: createdPost
    })
  } catch (error) {
    return next(error)
  }
}

async function updatePost(req, res, next) {
  try {
    const validation = validateUpdateBlogPostPayload(req.body)

    if (!validation.isValid) {
      throw new AppError("Payload inválido para atualização de post.", 400, validation.errors)
    }

    const updatedPost = await blogService.updatePostByIdentifier(req.params.identifier, validation.value)

    return res.status(200).json({
      data: updatedPost
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createPost,
  getPostByIdOrSlug,
  listPosts,
  updatePost
}