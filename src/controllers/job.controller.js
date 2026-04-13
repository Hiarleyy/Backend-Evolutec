const prisma = require('../lib/prisma');

async function create(req, res) {
  const { firstName, lastName, phone, email, role, city } = req.body;
  if (!firstName || !lastName || !phone || !email || !role || !city) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const cvFileUrl = req.file ? req.file.path : null;

  const application = await prisma.jobApplication.create({
    data: { firstName, lastName, phone, email, role, city, cvFileUrl },
  });
  return res.status(201).json(application);
}

module.exports = { create };
