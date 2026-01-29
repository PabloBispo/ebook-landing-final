import { PrismaClient, UserRole, PromptStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting prompts seed...')

  // 1. Atualizar usuário para STAFF
  const staff = await prisma.user.upsert({
    where: { email: 'pablofernando@live.com' },
    update: { role: UserRole.STAFF },
    create: {
      email: 'pablofernando@live.com',
      name: 'Pablo Fernando',
      role: UserRole.STAFF,
    },
  })
  console.log('✓ Staff user created/updated:', staff.email)

  // 2. Criar categorias
  console.log('\n📁 Creating categories...')
  const categoriesList = [
    { name: 'Diagnóstico', slug: 'diagnostico', icon: '🎯', order: 1, description: 'Prompts para análise e diagnóstico de nichos e ideias' },
    { name: 'Validação', slug: 'validacao', icon: '🔍', order: 2, description: 'Prompts para validar ideias e hipóteses' },
    { name: 'Avatar', slug: 'avatar', icon: '👤', order: 3, description: 'Prompts para criar e refinar avatares de cliente' },
    { name: 'Copywriting', slug: 'copywriting', icon: '✍️', order: 4, description: 'Prompts para textos persuasivos e vendas' },
    { name: 'Estratégia', slug: 'estrategia', icon: '📊', order: 5, description: 'Prompts para planejamento estratégico' },
  ]

  const categories = await Promise.all(
    categoriesList.map(cat =>
      prisma.promptCategory.upsert({
        where: { slug: cat.slug },
        update: cat,
        create: cat,
      })
    )
  )
  console.log(`✓ Created ${categories.length} categories`)

  // 3. Criar tags
  console.log('\n🏷️  Creating tags...')
  const tagsList = [
    { name: 'avatar', slug: 'avatar' },
    { name: 'estratégia', slug: 'estrategia' },
    { name: 'nicho', slug: 'nicho' },
    { name: 'validação', slug: 'validacao' },
    { name: 'copy', slug: 'copy' },
    { name: 'diagnóstico', slug: 'diagnostico' },
  ]

  const tags = await Promise.all(
    tagsList.map(tag =>
      prisma.promptTag.upsert({
        where: { slug: tag.slug },
        update: tag,
        create: tag,
      })
    )
  )
  console.log(`✓ Created ${tags.length} tags`)

  // 4. Criar prompts de exemplo
  console.log('\n💬 Creating example prompts...')

  // Prompt 1: Avatar Profundo
  const avatarPrompt = await prisma.prompt.upsert({
    where: { slug: 'criar-avatar-profundo' },
    update: {},
    create: {
      slug: 'criar-avatar-profundo',
      alias: 'AVATAR-01',
      title: 'Criar Avatar Profundo',
      description: 'Crie um avatar detalhado em 4 camadas (demográfica, psicográfica, comportamental e aspiracional) baseado em dados reais do seu nicho.',
      categoryId: categories.find(c => c.slug === 'avatar')?.id,
      status: PromptStatus.PUBLISHED,
      creatorId: staff.id,
      sourceChapter: 'cap-07',
      placeholders: [
        {
          key: 'nicho',
          label: 'Seu nicho ou mercado',
          type: 'text',
          required: true,
          description: 'Ex: emagrecimento para mulheres 40+, cursos de violão online',
        },
        {
          key: 'dados_existentes',
          label: 'Dados que você já tem (opcional)',
          type: 'textarea',
          required: false,
          description: 'Pesquisas, comentários de clientes, dados de audiência, etc.',
        },
      ],
      versions: {
        create: [
          {
            modelTag: 'universal',
            content: `Me ajude a criar um avatar profundo e detalhado para o meu negócio.

**Nicho/Mercado:** {{nicho}}

{{dados_existentes:Dados existentes: {{dados_existentes}}}}

Por favor, desenvolva um avatar completo nas 4 camadas:

1. **Demográfica** (idade, gênero, localização, renda, profissão)
2. **Psicográfica** (valores, crenças, medos, desejos)
3. **Comportamental** (hábitos, onde busca informação, padrões de compra)
4. **Aspiracional** (sonhos, objetivos, transformação desejada)

Para cada camada, seja específico e baseie suas conclusões em dados reais do mercado.`,
            isRecommended: true,
          },
          {
            modelTag: 'chatgpt-4',
            content: `Atue como especialista em marketing e pesquisa de mercado.

Preciso criar um avatar detalhado para: {{nicho}}

{{dados_existentes:Tenho os seguintes dados: {{dados_existentes}}}}

Desenvolva um perfil completo em 4 camadas:
- Demográfica
- Psicográfica
- Comportamental
- Aspiracional

Use dados reais do mercado e seja extremamente específico.`,
            isRecommended: false,
          },
        ],
      },
      publishedAt: new Date(),
    },
  })

  // Conectar tags ao prompt de avatar
  await prisma.prompt.update({
    where: { id: avatarPrompt.id },
    data: {
      tags: {
        connect: [
          { slug: 'avatar' },
          { slug: 'estrategia' },
        ],
      },
    },
  })
  console.log('✓ Created: Criar Avatar Profundo')

  // Prompt 2: Validação de Nicho
  const validacaoPrompt = await prisma.prompt.upsert({
    where: { slug: 'validar-nicho' },
    update: {},
    create: {
      slug: 'validar-nicho',
      alias: 'VALID-01',
      title: 'Validar Ideia de Nicho',
      description: 'Valide se seu nicho tem potencial de mercado através de 7 critérios essenciais.',
      categoryId: categories.find(c => c.slug === 'validacao')?.id,
      status: PromptStatus.PUBLISHED,
      creatorId: staff.id,
      sourceChapter: 'cap-02',
      placeholders: [
        {
          key: 'nicho',
          label: 'Nicho a validar',
          type: 'text',
          required: true,
        },
      ],
      versions: {
        create: {
          modelTag: 'universal',
          content: `Preciso validar o seguinte nicho: {{nicho}}

Analise e pontue de 0 a 10 cada critério:

1. **Tamanho de Mercado** (existe audiência suficiente?)
2. **Dor/Problema** (é urgente e doloroso o suficiente?)
3. **Poder de Compra** (o público tem dinheiro?)
4. **Acessibilidade** (consigo alcançar essas pessoas?)
5. **Concorrência** (qual o nível de saturação?)
6. **Expertise/Paixão** (tenho conhecimento ou interesse?)
7. **Tendência** (está crescendo ou caindo?)

Para cada critério, dê a nota, justificativa e sugestões de melhoria.
Ao final, dê um veredicto: SEGUIR, AJUSTAR ou DESCARTAR.`,
          isRecommended: true,
        },
      },
      publishedAt: new Date(),
    },
  })

  await prisma.prompt.update({
    where: { id: validacaoPrompt.id },
    data: {
      tags: {
        connect: [
          { slug: 'validacao' },
          { slug: 'nicho' },
          { slug: 'diagnostico' },
        ],
      },
    },
  })
  console.log('✓ Created: Validar Ideia de Nicho')

  // Prompt 3: Headline Irresistível
  const headlinePrompt = await prisma.prompt.upsert({
    where: { slug: 'criar-headline-irresistivel' },
    update: {},
    create: {
      slug: 'criar-headline-irresistivel',
      alias: 'COPY-01',
      title: 'Criar Headline Irresistível',
      description: 'Gere 10 headlines poderosas usando frameworks comprovados (PAS, 4Us, Before-After-Bridge).',
      categoryId: categories.find(c => c.slug === 'copywriting')?.id,
      status: PromptStatus.PUBLISHED,
      creatorId: staff.id,
      sourceChapter: 'cap-09',
      placeholders: [
        {
          key: 'produto',
          label: 'Produto/Oferta',
          type: 'text',
          required: true,
        },
        {
          key: 'beneficio_principal',
          label: 'Principal benefício',
          type: 'text',
          required: true,
        },
        {
          key: 'avatar',
          label: 'Para quem é (avatar)',
          type: 'text',
          required: true,
        },
      ],
      versions: {
        create: {
          modelTag: 'universal',
          content: `Crie 10 headlines irresistíveis para:

**Produto:** {{produto}}
**Benefício principal:** {{beneficio_principal}}
**Público-alvo:** {{avatar}}

Use os frameworks:
- PAS (Problem-Agitate-Solution)
- 4Us (Unique, Ultra-specific, Useful, Urgent)
- Before-After-Bridge
- Curiosity Gap
- Resultado + Prazo

Para cada headline, indique qual framework foi usado e por que ela funciona.`,
          isRecommended: true,
        },
      },
      publishedAt: new Date(),
    },
  })

  await prisma.prompt.update({
    where: { id: headlinePrompt.id },
    data: {
      tags: {
        connect: [
          { slug: 'copy' },
          { slug: 'estrategia' },
        ],
      },
    },
  })
  console.log('✓ Created: Criar Headline Irresistível')

  console.log('\n✅ Seed completo!')
  console.log(`\nResumo:
  - 1 usuário STAFF
  - ${categories.length} categorias
  - ${tags.length} tags
  - 3 prompts publicados com múltiplas versões
  `)
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
