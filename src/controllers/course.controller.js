const prisma = require('../lib/prisma');

async function list(req, res) {
  const courses = await prisma.course.findMany({
    include: { objectives: true, curriculum: { include: { topics: true } }, careerOpportunities: true },
  });
  return res.json(courses);
}

async function getBySlug(req, res) {
  const course = await prisma.course.findUnique({
    where: { slug: req.params.slug },
    include: { objectives: true, curriculum: { include: { topics: true } }, careerOpportunities: true },
  });
  if (!course) return res.status(404).json({ error: 'Curso não encontrado.' });
  return res.json(course);
}

async function create(req, res) {
  const { objectives, curriculum, careerOpportunities, ...data } = req.body;
  const course = await prisma.course.create({
    data: {
      ...data,
      objectives: objectives ? { create: objectives } : undefined,
      curriculum: curriculum
        ? { create: curriculum.map((m) => ({ title: m.title, topics: { create: m.topics || [] } })) }
        : undefined,
      careerOpportunities: careerOpportunities ? { create: careerOpportunities } : undefined,
    },
  });
  return res.status(201).json(course);
}

async function update(req, res) {
  const id = parseInt(req.params.id);
  const { objectives, curriculum, careerOpportunities, ...data } = req.body;
  const course = await prisma.course.update({ where: { id }, data });
  return res.json(course);
}

async function remove(req, res) {
  const id = parseInt(req.params.id);
  await prisma.course.delete({ where: { id } });
  return res.status(204).send();
}

module.exports = { list, getBySlug, create, update, remove };
