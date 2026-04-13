# Requisitos de Backend MVP

## 1. Contexto

O backend do sistema deve atender a landing page da Evolutec, centralizando o conteúdo que hoje está estático no front e recebendo os principais formulários de captação de lead.

O objetivo do MVP é substituir integrações diretas com Google Apps Script e dados hardcoded por uma API simples, estável e pronta para evoluir.

## 2. Objetivo do MVP

Entregar um backend que permita:

1. Consultar cursos, blog e e-books via API.
2. Receber contatos de matrícula e interesse comercial.
3. Registrar downloads de e-books com captura de lead.
4. Centralizar dados institucionais básicos do site.

## 3. Escopo Funcional

### 3.1 Conteúdo público

O backend deve disponibilizar dados para as seguintes áreas do site:

- Cursos.
- Blog.
- E-books gratuitos.
- Informações institucionais e de contato.

### 3.2 Captação de leads

O backend deve receber e armazenar os seguintes formulários:

- Formulário de contato/matrícula.
- Formulário de download de e-book.

### 3.3 Vagas / Trabalhe Conosco

No MVP, a página de vagas pode continuar com link externo para candidatura, sem necessidade de backend próprio. Se houver prioridade de negócio, isso pode virar uma fase 2.

## 4. Entidades de Dados

### 4.1 Curso

Campos mínimos:

- id
- slug
- title
- category
- image
- mode
- duration
- hours
- tag
- description
- fullDescription
- objectives
- curriculum
- careerOpportunities
- requirements
- certificationType
- salary
- marketInfo
- destaque

### 4.2 Post do blog

Campos mínimos:

- id
- imagem
- tags
- titulo
- subtitulo
- data
- conteudo
- destaque

### 4.3 E-book

Campos mínimos:

- id
- titulo
- descricao
- categoria
- capa
- downloadUrl

### 4.4 Lead de contato / matrícula

Campos mínimos:

- id
- nome
- telefone
- curso
- cidade
- lgpdConsent
- origem
- createdAt

### 4.5 Lead de download de e-book

Campos mínimos:

- id
- nome
- email
- telefone
- empresa
- ebookId
- ebookTitulo
- origem
- createdAt

### 4.6 Configurações institucionais

Campos mínimos:

- telefoneWhatsApp
- emailContato
- linksRedesSociais
- enderecoOuUnidades
- mapaLatitude
- mapaLongitude

## 5. Requisitos Funcionais da API

### 5.1 Cursos

- Listar cursos com suporte a filtros básicos no front.
- Buscar curso por slug.
- Retornar os dados completos usados na página de detalhes.

### 5.2 Blog

- Listar posts.
- Buscar post por id ou slug.
- Retornar destaque para home.

### 5.3 E-books

- Listar e-books por categoria.
- Retornar metadados de cada material.
- Registrar lead antes de liberar o download.

### 5.4 Contato / Matrícula

- Receber nome, telefone, curso, cidade e consentimento LGPD.
- Salvar o lead com timestamp e origem da página.
- Retornar resposta de sucesso para a interface exibir confirmação.

### 5.5 Configurações do site

- Retornar dados institucionais usados em navbar, footer, mapa e botões de contato.

## 6. Endpoints Sugeridos

### Público

- `GET /api/courses`
- `GET /api/courses/:slug`
- `GET /api/blog-posts`
- `GET /api/blog-posts/:id`
- `GET /api/ebooks`
- `GET /api/site-settings`

### Leads

- `POST /api/leads/contact`
- `POST /api/leads/ebook-download`

### Opcional para fase 2

- `GET /api/leads`
- `GET /api/leads/:id`
- `PATCH /api/leads/:id`
- `POST /api/admin/courses`
- `PUT /api/admin/courses/:id`
- `DELETE /api/admin/courses/:id`

## 7. Payloads Mínimos

### 7.1 Lead de contato

```json
{
  "nome": "Maria Silva",
  "telefone": "(91) 99999-9999",
  "curso": "Atendente de Farmacia",
  "cidade": "Castanhal",
  "lgpdConsent": true,
  "origem": "home"
}
```

### 7.2 Lead de e-book

```json
{
  "nome": "João Pereira",
  "email": "joao@email.com",
  "telefone": "(91) 98888-8888",
  "empresa": "Empresa X",
  "ebookId": 1,
  "ebookTitulo": "Guia para atendente de farmácia",
  "origem": "ebooks"
}
```

## 8. Regras de Negócio

1. Contato e e-book devem ser validados antes do salvamento.
2. Telefone e e-mail precisam ter validação mínima de formato.
3. O consentimento LGPD deve ser obrigatório para o formulário de matrícula.
4. O download do e-book só deve ser liberado após o envio do lead.
5. O backend deve registrar a origem do lead para rastreio comercial.
6. O conteúdo retornado deve vir em JSON e manter compatibilidade com o front atual.

## 9. Requisitos Não Funcionais

1. API REST simples e documentada.
2. Respostas rápidas para listagens públicas.
3. CORS liberado para o domínio do front.
4. Logs de requisição e erro para auditoria básica.
5. Validação de entrada em todos os endpoints de escrita.
6. Armazenamento persistente em banco relacional ou equivalente.
7. Preparado para futura integração com painel administrativo.

## 10. Critérios de Aceite do MVP

O MVP estará pronto quando:

1. O front conseguir carregar cursos, blog e e-books pela API.
2. O formulário de contato salvar leads corretamente no backend.
3. O formulário de e-book salvar leads antes de liberar o arquivo.
4. O site puder exibir confirmação de envio sem depender de Google Apps Script.
5. As informações institucionais estiverem centralizadas em um endpoint único.

## 11. Fora do Escopo do MVP

- Painel administrativo completo.
- Autenticação de múltiplos perfis de acesso.
- Workflow de candidatura para vagas.
- CRM avançado.
- Automação de e-mail e WhatsApp.
- Relatórios analíticos complexos.

## 12. Observação Técnica

Hoje o front usa dados estáticos para cursos, blog e e-books, além de integrações diretas com Google Apps Script para captura de contatos e downloads. O backend do MVP deve assumir esses pontos como fonte oficial de dados e captura de leads.