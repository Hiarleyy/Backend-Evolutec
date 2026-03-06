const prisma = require('../lib/prisma');

async function list(req, res) {
  const units = await prisma.unit.findMany();
  return res.json(units);
}

async function create(req, res) {
  const unit = await prisma.unit.create({ data: req.body });
  return res.status(201).json(unit);
}

module.exports = { list, create };
