const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const BASE_IMAGE = 'https://images.unsplash.com';
const img = (id) => `${BASE_IMAGE}/${id}?w=600&h=400&fit=crop`;

const courses = [
  { slug: 'tecnologia', title: 'Tecnologia', category: 'TECNOLOGIA', imageUrl: img('photo-1517694712202-14dd9538aa97'), tag: 'Profissionalizante' },
  { slug: 'atendente-de-farmacia', title: 'Atendente de Farmácia', category: 'SAÚDE', imageUrl: img('photo-1587854692152-cbe660dbde88'), tag: 'Profissionalizante' },
  { slug: 'operador-de-caixa', title: 'Operador de Caixa', category: 'COMÉRCIO', imageUrl: img('photo-1556742049-0cfed4f6a45d'), tag: 'Profissionalizante' },
  { slug: 'hotelaria', title: 'Hotelaria e Turismo', category: 'TURISMO', imageUrl: img('photo-1566073771259-6a8506099945'), tag: 'Profissionalizante' },
  { slug: 'rotinas-administrativas', title: 'Rotinas Administrativas', category: 'GESTÃO', imageUrl: img('photo-1454165804606-c3d57bc86b40'), tag: 'Profissionalizante' },
  { slug: 'informatica-completo', title: 'Informática Completo', category: 'TECNOLOGIA', imageUrl: img('photo-1517694712202-14dd9538aa97'), tag: 'Profissionalizante' },
  { slug: 'power-bi', title: 'Power BI', category: 'DADOS', imageUrl: img('photo-1551288049-bebda4e38f71'), tag: 'Especialização' },
  { slug: 'design-web', title: 'Profissional Design Web', category: 'DESIGN', imageUrl: img('photo-1581291518633-83b4ebd1d83e'), tag: 'Profissionalizante' },
  { slug: 'informatica-operador-caixa', title: 'Profissional em Informática e Operador de Caixa', category: 'COMÉRCIO', imageUrl: img('photo-1556740738-b6a63e27c4df'), tag: 'Profissionalizante' },
  { slug: 'desenvolvedor-games-apps', title: 'Desenvolvedor Games e Apps', category: 'PROGRAMAÇÃO', imageUrl: img('photo-1552820728-8b83bb6b773f'), tag: 'Tecnológico' },
  { slug: 'profissional-planilhas', title: 'Profissional em Planilhas', category: 'ADMINISTRAÇÃO', imageUrl: img('photo-1460925895917-afdab827c52f'), tag: 'Especialização' },
  { slug: 'gerenciamento-pessoas', title: 'Gerenciamento De Pessoas', category: 'RH', imageUrl: img('photo-1519389950473-47ba0277781c'), tag: 'Profissionalizante' },
  { slug: 'redes-infraestrutura', title: 'REDES & Infraestrutura', category: 'TECNOLOGIA', imageUrl: img('photo-1558618666-fcd25c85cd64'), tag: 'Técnico' },
  { slug: 'animacao-3d', title: 'Profissional em Animação 3D', category: 'DESIGN', imageUrl: img('photo-1617791160505-6f00504e3519'), tag: 'Especialização' },
  { slug: 'auxiliar-administrativo', title: 'Auxiliar Administrativo', category: 'ADMINISTRAÇÃO', imageUrl: img('photo-1450101499163-c8848c66ca85'), tag: 'Profissionalizante' },
  { slug: 'marketing-digital', title: 'Marketing Digital', category: 'MARKETING', imageUrl: img('photo-1533750516457-a7f992034fec'), tag: 'Profissionalizante' },
  { slug: 'manutencao-celulares', title: 'Manutenção de Celulares', category: 'TÉCNICO', imageUrl: img('photo-1601784551446-20c9e07cdbdb'), tag: 'Técnico' },
  { slug: 'google-workspace', title: 'Google WorkSpace', category: 'PRODUTIVIDADE', imageUrl: img('photo-1572021335469-31706a17aaef'), tag: 'Especialização' },
  { slug: 'gestao-empresarial', title: 'Gestão Empresarial', category: 'GESTÃO', imageUrl: img('photo-1507679799987-c73779587ccf'), tag: 'Profissionalizante' },
];

async function main() {
  console.log('Iniciando seed...');

  // Admin padrão
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@evolutec.com.br' },
    update: {},
    create: {
      email: 'admin@evolutec.com.br',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN',
    },
  });
  console.log('Usuário admin criado: admin@evolutec.com.br / admin123');

  // Cursos
  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: {
        ...course,
        mode: 'PRESENCIAL',
        duration: 'A definir',
        hours: 'A definir',
        description: `Curso de ${course.title}`,
        fullDescription: `Descrição completa do curso de ${course.title}.`,
      },
    });
  }
  console.log(`${courses.length} cursos inseridos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
