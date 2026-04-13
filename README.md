# Backend-Evolutec

## Acesso administrativo para rotas POST

As rotas de criação abaixo agora exigem autenticação de administrador via HTTP Basic Auth:

- `POST /api/courses`
- `POST /api/blog-posts`
- `POST /api/ebooks`

As rotas de alteração de conteúdo também exigem autenticação de administrador:

- `PATCH /api/courses/:slug`
- `PATCH /api/blog-posts/:identifier`
- `PATCH /api/ebooks/:id`

## Upload e download de e-books (PDF)

O servidor agora utiliza a pasta `ebooks/` na raiz do projeto para armazenar PDFs enviados via request.

### Referência `caminho`

Ao enviar um PDF no campo `arquivo` (multipart/form-data), o backend salva o nome do arquivo no campo `caminho` do e-book.

Também é preenchido automaticamente o campo `downloadUrl` no formato:

- `/api/ebooks/download/:caminho`

### Endpoint de download

- `GET /api/ebooks/download/:caminho`

Esse endpoint localiza o e-book pelo `caminho` salvo e faz o download do PDF.

### Exemplo de criação com upload de PDF

```bash
curl -X POST http://localhost:3000/api/ebooks \
	-u "$ADMIN_USERNAME:$ADMIN_PASSWORD" \
	-F "slug=guia-operacoes" \
	-F "titulo=Guia de Operações" \
	-F "descricao=Material completo em PDF" \
	-F "categoria=Operações" \
	-F "capa=/assets/ebooks/guia-operacoes.jpg" \
	-F "arquivo=@./meu-ebook.pdf"
```

### Variáveis de ambiente

Configure as credenciais no ambiente:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

Sem essas variáveis, as rotas administrativas responderão com erro `500`.

### Exemplo de requisição autenticada

```bash
curl -X POST http://localhost:3000/api/courses \
	-u "$ADMIN_USERNAME:$ADMIN_PASSWORD" \
	-H "Content-Type: application/json" \
	-d '{
		"slug": "novo-curso",
		"title": "Novo Curso",
		"category": "Tecnologia",
		"image": "/assets/courses/novo-curso.jpg",
		"mode": "Online",
		"duration": "3 meses",
		"hours": 120,
		"tag": "Novo",
		"description": "Descrição curta",
		"fullDescription": "Descrição completa",
		"objectives": ["Objetivo 1"],
		"curriculum": ["Módulo 1"],
		"careerOpportunities": ["Mercado X"],
		"requirements": ["Requisito Y"],
		"certificationType": "Certificado",
		"salary": "R$ 2.000 a R$ 3.000",
		"marketInfo": "Informações de mercado",
		"destaque": false
	}'
```