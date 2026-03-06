# Especificação do Backend - Landing Page Evolutec

> **Última atualização:** 06/03/2026 — Adicionadas imagens de stock (Unsplash) para os cursos *REDES & Infraestrutura*, *Profissional em Animação 3D* e *Manutenção de Celulares*. Adicionada seção de Estratégia de Imagens e Seed Data dos 19 cursos.

Esta documentação descreve a estrutura do backend em formato **MVC (Model-View-Controller)** utilizando **Prisma ORM** e **PostgreSQL**, projetada para atender às necessidades dinâmicas do projeto `landing-page-evolutec`.

## 1. Visão Geral da Arquitetura

O backend será estruturado para suportar o gerenciamento de conteúdo do site (CMS) e a captura de dados de visitantes.

*   **Linguagem:** Node.js (TypeScript recomendado) ou Python.
*   **Banco de Dados:** PostgreSQL.
*   **ORM:** Prisma.
*   **Níveis de Usuário:**
    *   **ADMIN:** Acesso total (criar usuários, configurações, deletar registros sensíveis).
    *   **EDITOR:** Gerenciar conteúdo (Blogs, Cursos, Depoimentos, FAQs).
    *   **PUBLIC:** Acesso de leitura (Site) e escrita restrita (Formulários de contato/trabalhe conosco).

---

## 2. Modelagem de Dados (Prisma Schema)

Este schema cobre todas as seções dinâmicas identificadas no código frontend (`src/data`, `src/components`, etc.).

```prisma
// schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ---------------------------------------------------------
// USUÁRIOS E AUTENTICAÇÃO
// ---------------------------------------------------------

enum UserRole {
  ADMIN
  EDITOR
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // Hash da senha
  name      String
  role      UserRole @default(EDITOR)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ---------------------------------------------------------
// CONTEÚDO DO SITE (CMS)
// ---------------------------------------------------------

// 1. Blog (Referência: src/data/blogData.js)
model BlogPost {
  id          String   @id @default(uuid()) // Usar UUID para slugs ou manter ID numérico
  slug        String   @unique
  title       String
  subtitle    String?
  content     String   @db.Text // HTML ou Markdown
  imageUrl    String?
  publishDate DateTime @default(now())
  featured    Boolean  @default(false) // 'destaque'
  tags        String[] // Array de strings (Suportado no Postgres)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// 2. Cursos (Referência: src/data/coursesData.js)
// NOTA: O campo é chamado `image` no frontend (coursesData.js). 
//       No schema e na API, padronizar como `imageUrl` e fazer o mapeamento no serviço de cursos.
enum CourseMode {
  EAD
  PRESENCIAL
  HIBRIDO
}

model Course {
  id                  Int      @id @default(autoincrement())
  slug                String   @unique
  title               String
  category            String   // Ex: GESTÃO, SAÚDE
  imageUrl            String?
  mode                CourseMode
  duration            String   // Ex: "2 anos"
  hours               String   // Ex: "1600h"
  tag                 String?  // Ex: "Graduação"
  description         String   @db.Text // Descrição curta
  fullDescription     String   @db.Text // Descrição completa
  requirements        String?
  certificationType   String?
  salary              String?
  marketInfo          String?  @db.Text

  // Relacionamentos
  objectives          CourseObjective[]
  curriculum          CourseModule[]
  careerOpportunities CourseOpportunity[]

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}
  
model CourseObjective {
  id        Int    @id @default(autoincrement())
  text      String
  courseId  Int
  course    Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
}

model CourseModule {
  id        Int           @id @default(autoincrement())
  title     String        // Nome do módulo
  courseId  Int
  course    Course        @relation(fields: [courseId], references: [id], onDelete: Cascade)
  topics    CourseTopic[]
}

model CourseTopic {
  id        Int          @id @default(autoincrement())
  name      String
  moduleId  Int
  module    CourseModule @relation(fields: [moduleId], references: [id], onDelete: Cascade)
}

model CourseOpportunity {
  id        Int    @id @default(autoincrement())
  name      String // Ex: "Gestor de empresas"
  courseId  Int
  course    Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
}

// 3. Depoimentos (Referência: src/components/Depoimentos.jsx)
model Testimonial {
  id        Int      @id @default(autoincrement())
  name      String
  courseName String? // Texto livre ou relação opcional com Course
  text      String   @db.Text
  videoId   String?  // ID do Youtube
  imageUrl  String?
  active    Boolean  @default(true)
}

// 4. FAQ (Referência: src/components/FAQ.jsx)
model FAQ {
  id        Int     @id @default(autoincrement())
  question  String
  answer    String  @db.Text
  order     Int     @default(0) // Para ordenar na tela
}

// 5. Unidades/Mapa (Referência: src/components/Mapa.jsx)
model Unit {
  id          Int     @id @default(autoincrement())
  name        String  // Ex: "Polo Castanhal"
  description String?
  latitude    Float
  longitude   Float
  address     String?
  phone       String?
  whatsapp    String?
}

// 6. Galeria e Autoridade (src/components/GaleriaFormatura.jsx, src/components/autoridade.jsx)
model GalleryImage {
  id        Int      @id @default(autoincrement())
  title     String?
  imageUrl  String
  category  String?  // Ex: "Formatura", "Estrutura"
}

model Stat {
  id        Int     @id @default(autoincrement())
  label     String  // Ex: "Alunos Formados"
  value     String  // Ex: "5k+"
  icon      String?
}

// ---------------------------------------------------------
// CAPTURA DE DADOS (FORMULÁRIOS)
// ---------------------------------------------------------

// 7. Trabalhe Conosco (Referência: src/pages/TrabalheConosco.jsx)
model JobApplication {
  id          Int      @id @default(autoincrement())
  firstName   String
  lastName    String
  phone       String
  email       String
  role        String
  city        String
  cvFileUrl   String?  // URL do arquivo de currículo (upload)
  status      ApplicationStatus @default(PENDING)
  createdAt   DateTime @default(now())
}

enum ApplicationStatus {
  PENDING
  REVIEWED
  ARCHIVED
}

// 8. Leads / Contato Geral (Opção para salvar contatos ao invés de só mandar p/ WhatsApp)
model Lead {
  id        Int      @id @default(autoincrement())
  name      String
  phone     String
  courseInterest String?
  city      String?
  createdAt DateTime @default(now())
}
```

---

## 3. Estrutura de Pastas do Backend (Sugestão)

```text
/backend
  /src
    /controllers    # Lógica de entrada/saída (req, res)
    /services       # Regras de negócio e chamadas ao Prisma
    /routes         # Definição das rotas da API
    /middlewares    # Autenticação (JWT), Validação, Uploads
    /utils          # Funções auxiliares
    server.ts       # Entry point
```

---

## 4. Definição das Rotas da API (Endpoints)

Aqui estão os endpoints necessários para conectar seu frontend ao backend.

### **Autenticação (Auth)**
*   `POST /api/auth/login`: Login de Admin/Editor (Retorna JWT).
*   `POST /api/auth/register`: Criar novo usuário (Apenas Admin).

### **Cursos (Courses)**
*   `GET /api/courses`: Listar todos os cursos (Frontend: Página Cursos).
*   `GET /api/courses/:slug`: Detalhes de um curso (Frontend: Página CursoDetalhes).
*   `POST /api/courses`: Criar novo curso (Protegido: Admin/Editor).
*   `PUT /api/courses/:id`: Atualizar curso (Protegido).
*   `DELETE /api/courses/:id`: Remover curso (Protegido).

### **Blog**
*   `GET /api/blog`: Listar posts (com paginação e filtro por tag).
*   `GET /api/blog/:slug`: Ler post completo.
*   `POST /api/blog`: Criar post (Protegido).
*   `PUT /api/blog/:id`: Editar post (Protegido).

### **Institucional (Conteúdo Dinâmico)**
*   `GET /api/testimonials`: Listar depoimentos.
*   `POST /api/testimonials`: Adicionar depoimento (Protegido).
*   `GET /api/faq`: Listar perguntas frequentes.
*   `GET /api/units`: Listar unidades para o mapa.
*   `POST /api/units`: Gerenciar unidades (Protegido).
*   `GET /api/stats`: Pegar números (Ex: 5k+ alunos) para o componente Autoridade.

### **Formulários (Escrita Pública)**
*   `POST /api/jobs`: Enviar currículo ("Trabalhe Conosco").
    *   *Nota:* Este endpoint precisará de suporte a Upload de Arquivos (Multer/S3).
*   `POST /api/leads`: Salvar contato (Opcional, se quiser salvar além de mandar pro WhatsApp).

---

## 5. Estratégia de Imagens dos Cursos

O campo `imageUrl` (schema) / `image` (frontend) dos cursos segue esta hierarquia:

1.  **Imagem personalizada** — Upload feito pelo Admin/Editor, armazenado em bucket (S3 ou similar). URL salva no banco.
2.  **Stock image padrão (Unsplash)** — URLs do CDN Unsplash (`images.unsplash.com`) usadas como fallback enquanto não há imagem personalizada.

> **Convenção de nomenclatura:** o campo é `image` em `coursesData.js` (frontend). No schema Prisma e nas respostas da API, o campo deve ser chamado `imageUrl`. O service de cursos é responsável por mapear `image → imageUrl` ao migrar o seed para o banco.

Parâmetros padrão usados nas URLs Unsplash: `?w=600&h=400&fit=crop`

---

## 6. Seed Data — Cursos (19 registros)

Dados iniciais baseados em `src/data/coursesData.js` para popular o banco em ambiente de desenvolvimento/staging.

| id | slug | title | category | imageUrl (Unsplash) | tag |
|----|------|-------|----------|---------------------|-----|
| 1 | tecnologia | Tecnologia | TECNOLOGIA | photo-1517694712202-14dd9538aa97 | Profissionalizante |
| 2 | atendente-de-farmacia | Atendente de Farmácia | SAÚDE | photo-1587854692152-cbe660dbde88 | Profissionalizante |
| 3 | operador-de-caixa | Operador de Caixa | COMÉRCIO | photo-1556742049-0cfed4f6a45d | Profissionalizante |
| 4 | hotelaria | Hotelaria e Turismo | TURISMO | photo-1566073771259-6a8506099945 | Profissionalizante |
| 5 | rotinas-administrativas | Rotinas Administrativas | GESTÃO | photo-1454165804606-c3d57bc86b40 | Profissionalizante |
| 6 | informatica-completo | Informática Completo | TECNOLOGIA | photo-1517694712202-14dd9538aa97 | Profissionalizante |
| 7 | power-bi | Power BI | DADOS | photo-1551288049-bebda4e38f71 | Especialização |
| 8 | design-web | Profissional Design Web | DESIGN | photo-1581291518633-83b4ebd1d83e | Profissionalizante |
| 9 | informatica-operador-caixa | Profissional em Informática e Operador de Caixa | COMÉRCIO | photo-1556740738-b6a63e27c4df | Profissionalizante |
| 10 | desenvolvedor-games-apps | Desenvolvedor Games e Apps | PROGRAMAÇÃO | photo-1552820728-8b83bb6b773f | Tecnológico |
| 11 | profissional-planilhas | Profissional em Planilhas | ADMINISTRAÇÃO | photo-1460925895917-afdab827c52f | Especialização |
| 12 | gerenciamento-pessoas | Gerenciamento De Pessoas | RH | photo-1519389950473-47ba0277781c | Profissionalizante |
| 13 | redes-infraestrutura | REDES & Infraestrutura | TECNOLOGIA | **photo-1558618666-fcd25c85cd64** *(atualizado 06/03/26)* | Técnico |
| 14 | animacao-3d | Profissional em Animação 3D | DESIGN | **photo-1617791160505-6f00504e3519** *(atualizado 06/03/26)* | Especialização |
| 15 | auxiliar-administrativo | Auxiliar Administrativo | ADMINISTRAÇÃO | photo-1450101499163-c8848c66ca85 | Profissionalizante |
| 16 | marketing-digital | Marketing Digital | MARKETING | photo-1533750516457-a7f992034fec | Profissionalizante |
| 17 | manutencao-celulares | Manutenção de Celulares | TÉCNICO | **photo-1601784551446-20c9e07cdbdb** *(atualizado 06/03/26)* | Técnico |
| 18 | google-workspace | Google WorkSpace | PRODUTIVIDADE | photo-1572021335469-31706a17aaef | Especialização |
| 19 | gestao-empresarial | Gestão Empresarial | GESTÃO | photo-1507679799987-c73779587ccf | Profissionalizante |

> Todas as URLs completas seguem o padrão: `https://images.unsplash.com/{photo-id}?w=600&h=400&fit=crop`

