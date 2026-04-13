# Configuração Prisma + PostgreSQL

## 📋 Pré-Requisitos

- Node.js 16+ instalado
- Docker e Docker Compose instalados
- PostgreSQL rodando via Docker Compose

## 🚀 Setup Inicial

### 1. Instalar Dependências

```bash
npm install
```

Isto irá instalar:
- `@prisma/client`: Cliente do Prisma para Node.js
- `@prisma/cli`: CLI do Prisma para migrations
- Outras dependências do projeto

### 2. Iniciar o Banco de Dados

```bash
docker-compose up -d
```

Isto irá iniciar um container PostgreSQL com:
- **Host**: `localhost`
- **Porta**: `5433`
- **Usuário**: `postgres`
- **Senha**: `docker`
- **Database**: `BDEVOLUTEC`

Verifique se o container está rodando:

```bash
docker-compose ps
```

### 3. Executar Migrations

```bash
npm run prisma:migrate
```

Isto irá:
- Criar todas as tabelas no banco de dados
- Gerar o Prisma Client

### 4. Popular o Banco com Dados Iniciais (Seeding)

```bash
npm run prisma:seed
```

Isto irá inserir:
- ✅ 2 cursos de exemplo
- ✅ 2 blog posts de exemplo
- ✅ 2 e-books de exemplo
- ✅ Configurações do site padrão

### 5. Iniciar o Servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 🛠️ Comandos Úteis Prisma

### Visualizar o banco via Interface Web

```bash
npm run prisma:studio
```

Isto abre uma interface web em `http://localhost:5555` para:
- Visualizar dados das tabelas
- Fazer queries
- Editar registros manualmente

### Ver Status das Migrations

```bash
npx prisma migrate status
```

### Reverter a Última Migration

```bash
npx prisma migrate resolve --rolled-back <name>
```

### Gerar Nova Migration (após mudar schema.prisma)

```bash
npm run prisma:migrate
```

## 📊 Estrutura do Banco de Dados

### Tabelas

#### `courses`
- Cursos profissionais com descrição detalhada
- Campos: title, slug, category, mode, duration, hours, salary, etc.

#### `blog_posts`
- Posts do blog com tags
- Campos: titulo, slug, tags[], conteudo, destaque, etc.

#### `ebooks`
- E-books disponíveis para download
- Campos: titulo, slug, categoria, capa, downloadUrl, etc.

#### `leads`
- Leads de contato e download de e-books
- Tipos: `CONTACT` (contato) ou `EBOOK` (e-book)
- Relacionamento com `lead_ebooks` para downloads

#### `lead_ebooks`
- Detalhes de leads de download de e-books
- Relacionamento com `leads` (1:1) e `ebooks` (1:N)

#### `site_settings`
- Configurações do site (WhatsApp, email, redes sociais, endereços)
- Um único registro com JSON para dados complexos

## 🔄 Migrations

As migrations são versionadas em `prisma/migrations/`:

```
prisma/
├── migrations/
│   ├── [timestamp]_init/
│   │   └── migration.sql
│   └── ...
├── seed.js
└── schema.prisma
```

Cada pasta contém um arquivo `migration.sql` com as mudanças no banco de dados.

## 🚫 Parar o Banco de Dados

```bash
docker-compose down
```

Para remover os dados persistidos:

```bash
docker-compose down -v
```

## 📝 Atualizar Schema

Se precisar adicionar/modificar campos no banco:

1. Edite `prisma/schema.prisma`
2. Execute `npm run prisma:migrate`
3. Nomeie a migration descritivamente (ex: "add_new_field_to_course")
4. O arquivo SQL será gerado automaticamente

## ⚠️ Troubleshooting

### Erro: "Cannot find module '@prisma/client'"

```bash
npm install
npx prisma generate
```

### Erro: "error: relation "courses" does not exist"

O banco não foi migrado. Execute:

```bash
npm run prisma:migrate
npm run prisma:seed
```

### Erro: "connect ECONNREFUSED 127.0.0.1:5433"

Verifique se o PostgreSQL está rodando:

```bash
docker-compose ps
docker-compose up -d
```

### Resetar Banco Completamente

⚠️ **AVISO**: Isto deleta todos os dados!

```bash
npm run prisma:migrate reset
```

Isto:
1. Deleta todas as tabelas
2. Re-executa todas as migrations
3. Re-popula com dados do seed

## 💡 Dicas

- Use `npm run prisma:studio` para explorar dados visualmente
- Revise `prisma/schema.prisma` para entender a estrutura do banco
- Veja `prisma/seed.js` como exemplo de inserção de dados com Prisma
