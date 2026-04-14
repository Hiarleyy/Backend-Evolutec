const blogService = require("../services/blog.service")
const AppError = require("../error/app-error")

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
    const post = await blogService.createPost(req.body)

    return res.status(201).json({
      data: post
    })
  } catch (error) {
    return next(error)
  }
}

async function updatePost(req, res, next) {
  try {
    const identifier = req.params.identifier ?? req.params.id
    const post = await blogService.updatePostByIdentifier(identifier, req.body)

    return res.status(200).json({
      data: post
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createPost,
  getPostByIdOrSlug,
  listPosts,
  updatePost,
  // Backward compatibility for routes using legacy naming.
  create: createPost,
  getBySlug: getPostByIdOrSlug,
  list: listPosts,
  update: updatePost
}