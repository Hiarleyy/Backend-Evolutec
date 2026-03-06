const prisma = require('../lib/prisma');

async function list(req, res) {
  const { tag, page = 1, limit = 10 } = req.query;
  const where = tag ? { tags: { has: tag } } : {};
  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { publishDate: 'desc' },
    skip: (parseInt(page) - 1) * parseInt(limit),
    take: parseInt(limit),
  });
  return res.json(posts);
}

async function getBySlug(req, res) {
  const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } });
  if (!post) return res.status(404).json({ error: 'Post não encontrado.' });
  return res.json(post);
}

async function create(req, res) {
  const post = await prisma.blogPost.create({ data: req.body });
  return res.status(201).json(post);
}

async function update(req, res) {
  const post = await prisma.blogPost.update({ where: { id: req.params.id }, data: req.body });
  return res.json(post);
}

module.exports = { list, getBySlug, create, update };
