const express = require("express")
const coursesController = require("../controllers/courses.controller")
const blogController = require("../controllers/blog.controller")
const ebooksController = require("../controllers/ebooks.controller")
const siteSettingsController = require("../controllers/site-settings.controller")
const adminAuthMiddleware = require("../middlewares/admin-auth-middleware")
const ebookUploadMiddleware = require("../middlewares/ebook-upload-middleware")

const router = express.Router()

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Verificar saúde da API
 *     description: Retorna o status da API
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API está funcionando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok"
  })
})

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Listar todos os cursos
 *     description: Retorna a lista completa de todos os cursos disponíveis
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/courses", coursesController.listCourses)

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Criar curso (Admin)
 *     description: Cria um novo curso. Requer autenticação de administrador.
 *     tags:
 *       - Courses
 *     security:
 *       - basicAuth: []
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *       400:
 *         description: Payload inválido
 *       401:
 *         description: Autenticação obrigatória
 *       403:
 *         description: Credenciais inválidas
 *       409:
 *         description: Slug já existente
 */
router.post("/courses", adminAuthMiddleware, coursesController.createCourse)

/**
 * @swagger
 * /api/courses/{slug}:
 *   get:
 *     summary: Obter curso por slug
 *     description: Retorna um curso específico pelo seu slug
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug único do curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get("/courses/:slug", coursesController.getCourseBySlug)

/**
 * @swagger
 * /api/courses/{slug}:
 *   patch:
 *     summary: Atualizar curso (Admin)
 *     description: Atualiza parcialmente um curso por slug. Requer autenticação de administrador.
 *     tags:
 *       - Courses
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug atual do curso
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso
 *       400:
 *         description: Payload inválido
 *       401:
 *         description: Autenticação obrigatória
 *       403:
 *         description: Credenciais inválidas
 *       404:
 *         description: Curso não encontrado
 *       409:
 *         description: Slug já existente
 */
router.patch("/courses/:slug", adminAuthMiddleware, coursesController.updateCourse)

/**
 * @swagger
 * /api/blog-posts:
 *   get:
 *     summary: Listar posts do blog
 *     description: Retorna a lista de todos os posts do blog
 *     tags:
 *       - Blog
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogPost'
 *       500:
 *         description: Erro no servidor
 */
router.get("/blog-posts", blogController.listPosts)

/**
 * @swagger
 * /api/blog-posts:
 *   post:
 *     summary: Criar post do blog (Admin)
 *     description: Cria um novo post do blog. Requer autenticação de administrador.
 *     tags:
 *       - Blog
 *     security:
 *       - basicAuth: []
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Payload inválido
 *       401:
 *         description: Autenticação obrigatória
 *       403:
 *         description: Credenciais inválidas
 *       409:
 *         description: Slug já existente
 */
router.post("/blog-posts", adminAuthMiddleware, blogController.createPost)

/**
 * @swagger
 * /api/blog-posts/{identifier}:
 *   get:
 *     summary: Obter post do blog por ID ou slug
 *     description: Retorna um post específico pelo seu ID ou slug
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ou slug do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPost'
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get("/blog-posts/:identifier", blogController.getPostByIdOrSlug)

/**
 * @swagger
 * /api/blog-posts/{identifier}:
 *   patch:
 *     summary: Atualizar post do blog (Admin)
 *     description: Atualiza parcialmente um post por ID ou slug. Requer autenticação de administrador.
 *     tags:
 *       - Blog
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ou slug do post
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       400:
 *         description: Payload inválido
 *       401:
 *         description: Autenticação obrigatória
 *       403:
 *         description: Credenciais inválidas
 *       404:
 *         description: Post não encontrado
 *       409:
 *         description: Slug já existente
 */
router.patch("/blog-posts/:identifier", adminAuthMiddleware, blogController.updatePost)

/**
 * @swagger
 * /api/ebooks:
 *   get:
 *     summary: Listar todos os e-books
 *     description: Retorna a lista completa de todos os e-books disponíveis
 *     tags:
 *       - Ebooks
 *     responses:
 *       200:
 *         description: Lista de e-books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erro no servidor
 */
router.get("/ebooks", ebooksController.listEbooks)

/**
 * @swagger
 * /api/ebooks:
 *   post:
 *     summary: Criar e-book (Admin)
 *     description: Cria um novo e-book. Requer autenticação de administrador.
 *     tags:
 *       - Ebooks
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - slug
 *               - titulo
 *               - descricao
 *               - categoria
 *               - capa
 *             properties:
 *               slug:
 *                 type: string
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *               capa:
 *                 type: string
 *               arquivo:
 *                 type: string
 *                 format: binary
 *               downloadUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: E-book criado com sucesso
 *       400:
 *         description: Payload inválido
 *       401:
 *         description: Autenticação obrigatória
 *       403:
 *         description: Credenciais inválidas
 *       409:
 *         description: Slug já existente
 */
router.post("/ebooks", adminAuthMiddleware, ebookUploadMiddleware.single("arquivo"), ebooksController.createEbook)

/**
 * @swagger
 * /api/ebooks/{id}:
 *   get:
 *     summary: Obter e-book por ID
 *     description: Retorna um e-book específico pelo seu ID
 *     tags:
 *       - Ebooks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do e-book
 *     responses:
 *       200:
 *         description: E-book encontrado
 *       404:
 *         description: E-book não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get("/ebooks/:id", ebooksController.getEbookById)

/**
 * @swagger
 * /api/ebooks/download/{caminho}:
 *   get:
 *     summary: Download de e-book por caminho
 *     description: Faz o download do arquivo PDF armazenado no servidor para o e-book informado.
 *     tags:
 *       - Ebooks
 *     parameters:
 *       - in: path
 *         name: caminho
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do arquivo PDF salvo no servidor
 *     responses:
 *       200:
 *         description: Download iniciado com sucesso
 *       404:
 *         description: E-book ou arquivo não encontrado
 */
router.get("/ebooks/download/:caminho", ebooksController.downloadEbook)

/**
 * @swagger
 * /api/ebooks/{id}:
 *   patch:
 *     summary: Atualizar e-book (Admin)
 *     description: Atualiza parcialmente um e-book por ID. Requer autenticação de administrador.
 *     tags:
 *       - Ebooks
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *               capa:
 *                 type: string
 *               arquivo:
 *                 type: string
 *                 format: binary
 *               downloadUrl:
 *                 type: string
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do e-book
 *     responses:
 *       200:
 *         description: E-book atualizado com sucesso
 *       400:
 *         description: Payload inválido
 *       401:
 *         description: Autenticação obrigatória
 *       403:
 *         description: Credenciais inválidas
 *       404:
 *         description: E-book não encontrado
 *       409:
 *         description: Slug já existente
 */
router.patch("/ebooks/:id", adminAuthMiddleware, ebookUploadMiddleware.single("arquivo"), ebooksController.updateEbook)

/**
 * @swagger
 * /api/site-settings:
 *   get:
 *     summary: Obter configurações do site
 *     description: Retorna as configurações globais do site
 *     tags:
 *       - Site Settings
 *     responses:
 *       200:
 *         description: Configurações obtidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erro no servidor
 */
router.get("/site-settings", siteSettingsController.getSiteSettings)

module.exports = router