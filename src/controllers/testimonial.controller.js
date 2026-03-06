const prisma = require('../lib/prisma');

async function list(req, res) {
  const items = await prisma.testimonial.findMany({ where: { active: true } });
  return res.json(items);
}

async function create(req, res) {
  const item = await prisma.testimonial.create({ data: req.body });
  return res.status(201).json(item);
}

module.exports = { list, create };
