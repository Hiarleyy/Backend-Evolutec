const prisma = require('../lib/prisma');

async function list(req, res) {
  const items = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });
  return res.json(items);
}

async function create(req, res) {
  const item = await prisma.fAQ.create({ data: req.body });
  return res.status(201).json(item);
}

async function update(req, res) {
  const id = parseInt(req.params.id);
  const item = await prisma.fAQ.update({ where: { id }, data: req.body });
  return res.json(item);
}

async function remove(req, res) {
  const id = parseInt(req.params.id);
  await prisma.fAQ.delete({ where: { id } });
  return res.status(204).send();
}

module.exports = { list, create, update, remove };
