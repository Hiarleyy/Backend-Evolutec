const prisma = require('../lib/prisma');

async function list(req, res) {
  const stats = await prisma.stat.findMany();
  return res.json(stats);
}

module.exports = { list };
