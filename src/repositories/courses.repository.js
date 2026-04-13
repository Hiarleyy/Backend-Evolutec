const prisma = require("../database/prisma-client")

async function findAllCourses() {
  return await prisma.course.findMany({
    orderBy: {
      destaque: "desc"
    }
  })
}

async function findCourseBySlug(slug) {
  return await prisma.course.findUnique({
    where: { slug }
  })
}

async function createCourse(payload) {
  return await prisma.course.create({
    data: payload
  })
}

async function updateCourseBySlug(slug, payload) {
  return await prisma.course.update({
    where: { slug },
    data: payload
  })
}

module.exports = {
  createCourse,
  findAllCourses,
  findCourseBySlug,
  updateCourseBySlug
}