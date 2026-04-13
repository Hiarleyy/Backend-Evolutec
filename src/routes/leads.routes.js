const express = require("express")
const leadsController = require("../controllers/leads.controller")

const router = express.Router()

/**
 * @swagger
 * /api/leads/contact:
 *   post:
 *     summary: Criar um novo lead de contato
 *     description: Cria um novo lead com informações de contato
 *     tags:
 *       - Leads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - telefone
 *               - curso
 *               - cidade
 *               - origem
 *               - lgpdConsent
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do lead
 *                 example: "João Silva"
 *               telefone:
 *                 type: string
 *                 description: Telefone com validação de formato
 *                 example: "(11) 99999-9999"
 *               curso:
 *                 type: string
 *                 description: Nome do curso de interesse
 *                 example: "Python Avançado"
 *               cidade:
 *                 type: string
 *                 description: Cidade do lead
 *                 example: "São Paulo"
 *               origem:
 *                 type: string
 *                 description: Origem/fonte do lead
 *                 example: "Google Ads"
 *               lgpdConsent:
 *                 type: boolean
 *                 description: Consentimento para LGPD (obrigatório)
 *                 example: true
 *     responses:
 *       201:
 *         description: Lead de contato criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                   nullable: true
 *                 telefone:
 *                   type: string
 *                 type:
 *                   type: string
 *                   example: "CONTACT"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/contact", leadsController.createContactLead)

/**
 * @swagger
 * /api/leads/ebook-download:
 *   post:
 *     summary: Criar um novo lead para download de e-book
 *     description: Cria um novo lead com informações para obter acesso ao e-book
 *     tags:
 *       - Leads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - telefone
 *               - empresa
 *               - ebookId
 *               - ebookTitulo
 *               - origem
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do lead
 *                 example: "Maria Santos"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do lead
 *                 example: "maria@example.com"
 *               telefone:
 *                 type: string
 *                 description: Telefone do lead
 *                 example: "(11) 99999-9999"
 *               empresa:
 *                 type: string
 *                 description: Empresa do lead
 *                 example: "Tech Solutions"
 *               ebookId:
 *                 type: integer
 *                 description: ID do e-book para download
 *                 example: 1
 *               ebookTitulo:
 *                 type: string
 *                 description: Título do e-book
 *                 example: "Guia Completo de Python"
 *               origem:
 *                 type: string
 *                 description: Origem/fonte do lead
 *                 example: "LinkedIn"
 *     responses:
 *       201:
 *         description: Lead de e-book criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 telefone:
 *                   type: string
 *                 type:
 *                   type: string
 *                   example: "EBOOK"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/ebook-download", leadsController.createEbookLead)

module.exports = router