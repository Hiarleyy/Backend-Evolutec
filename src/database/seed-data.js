function buildSeedStore() {
  return {
    courses: [
      {
        id: 1,
        slug: "atendente-de-farmacia",
        title: "Atendente de Farmácia",
        category: "Saúde",
        image: "/assets/courses/atendente-de-farmacia.jpg",
        mode: "Presencial",
        duration: "3 meses",
        hours: 180,
        tag: "Mais procurado",
        description: "Formação prática para atuação no atendimento e rotina de farmácias.",
        fullDescription: "Curso voltado para a atuação em balcão, organização de estoque, atendimento ao cliente e apoio às rotinas de farmácias e drogarias.",
        objectives: [
          "Desenvolver atendimento humanizado",
          "Compreender rotinas de farmácia",
          "Apoiar organização de estoque"
        ],
        curriculum: [
          "Introdução ao ambiente farmacêutico",
          "Noções de medicamentos",
          "Atendimento e vendas",
          "Boas práticas de organização"
        ],
        careerOpportunities: [
          "Farmácias e drogarias",
          "Distribuidoras de medicamentos",
          "Estabelecimentos de saúde"
        ],
        requirements: [
          "Ensino médio em andamento ou concluído",
          "Idade mínima de 16 anos"
        ],
        certificationType: "Certificado de conclusão",
        salary: "R$ 1.500 a R$ 2.500",
        marketInfo: "Área com alta demanda por profissionais de atendimento e suporte operacional.",
        destaque: true
      },
      {
        id: 2,
        slug: "auxiliar-administrativo",
        title: "Auxiliar Administrativo",
        category: "Administração",
        image: "/assets/courses/auxiliar-administrativo.jpg",
        mode: "Híbrido",
        duration: "4 meses",
        hours: 200,
        tag: "Novo",
        description: "Base sólida para organização administrativa e suporte a equipes.",
        fullDescription: "Curso com foco em processos administrativos, atendimento interno, documentos, rotinas de escritório e ferramentas de produtividade.",
        objectives: [
          "Organizar rotinas administrativas",
          "Apoiar equipes e processos",
          "Trabalhar com documentação"
        ],
        curriculum: [
          "Rotinas administrativas",
          "Comunicação profissional",
          "Pacote office",
          "Gestão de documentos"
        ],
        careerOpportunities: [
          "Escritórios",
          "Lojas e centros de distribuição",
          "Empresas de serviços"
        ],
        requirements: [
          "Ensino médio em andamento ou concluído"
        ],
        certificationType: "Certificado de conclusão",
        salary: "R$ 1.700 a R$ 2.900",
        marketInfo: "Curso estratégico para portas de entrada em funções administrativas.",
        destaque: false
      }
    ],
    blogPosts: [
      {
        id: 1,
        slug: "como-escolher-uma-formacao-profissional",
        imagem: "/assets/blog/formacao-profissional.jpg",
        tags: ["Carreira", "Educação"],
        titulo: "Como escolher uma formação profissional",
        subtitulo: "Critérios práticos para decidir o próximo passo na sua carreira.",
        data: "2026-04-01",
        conteudo: "Escolher uma formação passa por avaliar mercado, rotina, custos e a aplicabilidade prática do aprendizado.",
        destaque: true
      },
      {
        id: 2,
        slug: "dicas-para-primeiro-emprego",
        imagem: "/assets/blog/primeiro-emprego.jpg",
        tags: ["Emprego", "Dicas"],
        titulo: "Dicas para conquistar o primeiro emprego",
        subtitulo: "Uma lista objetiva para quem está montando o currículo e buscando a primeira oportunidade.",
        data: "2026-04-05",
        conteudo: "Capriche no currículo, treine sua apresentação e pesquise a empresa antes da entrevista.",
        destaque: false
      }
    ],
    ebooks: [
      {
        id: 1,
        slug: "guia-atendente-de-farmacia",
        titulo: "Guia para Atendente de Farmácia",
        descricao: "Material introdutório com orientações iniciais para a área.",
        categoria: "Saúde",
        capa: "/assets/ebooks/guia-atendente-de-farmacia.jpg",
        downloadUrl: "/downloads/guia-atendente-de-farmacia.pdf"
      },
      {
        id: 2,
        slug: "guia-primeiro-emprego",
        titulo: "Guia do Primeiro Emprego",
        descricao: "Checklist para se organizar e aumentar as chances de contratação.",
        categoria: "Carreira",
        capa: "/assets/ebooks/guia-primeiro-emprego.jpg",
        downloadUrl: "/downloads/guia-primeiro-emprego.pdf"
      }
    ],
    leads: {
      contact: [],
      ebookDownloads: []
    },
    siteSettings: {
      telefoneWhatsApp: "+55 91 99999-9999",
      emailContato: "contato@evolutec.com.br",
      linksRedesSociais: {
        instagram: "https://instagram.com/evolutec",
        facebook: "https://facebook.com/evolutec",
        youtube: "https://youtube.com/@evolutec"
      },
      enderecoOuUnidades: [
        {
          nome: "Matriz",
          endereco: "Av. Principal, 1000 - Centro",
          cidade: "Castanhal - PA"
        }
      ],
      mapaLatitude: -1.293,
      mapaLongitude: -47.928
    }
  }
}

module.exports = {
  buildSeedStore
}