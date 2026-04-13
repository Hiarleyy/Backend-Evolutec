const coursesService = require("../services/courses.service")
const AppError = require("../error/app-error")
const {
  validateCreateCoursePayload,
  validateUpdateCoursePayload
} = require("../schemas/content.schema")

async function listCourses(req, res, next) {
  try {
    const courses = await coursesService.listCourses(req.query)

    return res.status(200).json({
      data: courses,
      count: courses.length
    })
  } catch (error) {
    return next(error)
  }
}

async function getCourseBySlug(req, res, next) {
  try {
    const course = await coursesService.getCourseBySlug(req.params.slug)

    if (!course) {
      throw new AppError("Curso não encontrado.", 404)
    }

    return res.status(200).json({
      data: course
    })
  } catch (error) {
    return next(error)
  }
}

async function createCourse(req, res, next) {
  try {
    const validation = validateCreateCoursePayload(req.body)

    if (!validation.isValid) {
      throw new AppError("Payload inválido para criação de curso.", 400, validation.errors)
    }

    const createdCourse = await coursesService.createCourse(validation.value)

    return res.status(201).json({
      data: createdCourse
    })
  } catch (error) {
    return next(error)
  }
}

async function updateCourse(req, res, next) {
  try {
    const validation = validateUpdateCoursePayload(req.body)

    if (!validation.isValid) {
      throw new AppError("Payload inválido para atualização de curso.", 400, validation.errors)
    }

    const updatedCourse = await coursesService.updateCourseBySlug(req.params.slug, validation.value)

    return res.status(200).json({
      data: updatedCourse
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createCourse,
  getCourseBySlug,
  listCourses,
  updateCourse
}