const prisma = require('../lib/prisma');

async function create(req, res) {
  const { name, phone, courseInterest, city } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios.' });
  }

  const lead = await prisma.lead.create({ data: { name, phone, courseInterest, city } });
  return res.status(201).json(lead);
}

module.exports = { create };
