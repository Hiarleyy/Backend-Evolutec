const blogService = require("../services/blog.service")
const AppError = require("../error/app-error")

function listPosts(req, res, next) {
  try {
    const posts = blogService.listPosts(req.query)

    return res.status(200).json({
      data: posts,
      count: posts.length
    })
  } catch (error) {
    return next(error)
  }
}

function getPostByIdOrSlug(req, res, next) {
  try {
    const post = blogService.getPostByIdOrSlug(req.params.identifier)

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

module.exports = {
  getPostByIdOrSlug,
  listPosts
}