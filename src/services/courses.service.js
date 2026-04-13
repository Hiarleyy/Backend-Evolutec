const coursesRepository = require("../repositories/courses.repository")
const AppError = require("../error/app-error")

function applyCourseFilters(courses, filters) {
  const category = typeof filters.category === "string" ? filters.category.trim().toLowerCase() : ""
  const mode = typeof filters.mode === "string" ? filters.mode.trim().toLowerCase() : ""
  const search = typeof filters.search === "string" ? filters.search.trim().toLowerCase() : ""
  const destaque = typeof filters.destaque === "string" ? filters.destaque.trim().toLowerCase() : ""

  return courses.filter((course) => {
    const courseCategory = String(course.category || "").toLowerCase()
    const courseMode = String(course.mode || "").toLowerCase()
    const courseTitle = String(course.title || "").toLowerCase()
    const courseDescription = String(course.description || "").toLowerCase()

    if (category && courseCategory !== category) {
      return false
    }

    if (mode && courseMode !== mode) {
      return false
    }

    if (destaque && String(Boolean(course.destaque)) !== destaque) {
      return false
    }

    if (search && !`${courseTitle} ${courseDescription}`.includes(search)) {
      return false
    }

    return true
  })
}

async function listCourses(filters = {}) {
  const courses = await coursesRepository.findAllCourses()
  return applyCourseFilters(courses, filters)
}

async function getCourseBySlug(slug) {
  return await coursesRepository.findCourseBySlug(slug)
}

async function createCourse(payload) {
  const existingCourse = await coursesRepository.findCourseBySlug(payload.slug)

  if (existingCourse) {
    throw new AppError("Já existe um curso com este slug.", 409)
  }

  return await coursesRepository.createCourse(payload)
}

async function updateCourseBySlug(slug, payload) {
  const existingCourse = await coursesRepository.findCourseBySlug(slug)

  if (!existingCourse) {
    throw new AppError("Curso não encontrado.", 404)
  }

  if (payload.slug && payload.slug !== slug) {
    const conflictCourse = await coursesRepository.findCourseBySlug(payload.slug)

    if (conflictCourse) {
      throw new AppError("Já existe um curso com este slug.", 409)
    }
  }

  return await coursesRepository.updateCourseBySlug(slug, payload)
}

module.exports = {
  createCourse,
  getCourseBySlug,
  listCourses,
  updateCourseBySlug
}