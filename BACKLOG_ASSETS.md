# Backlog de Assets Visuais - Landing Page @bispo.ia

> Documento criado em: 2026-01-28
>
> Este documento lista todos os assets visuais que precisam ser criados para a landing page.

---

## 📁 Estrutura de Diretórios

```
/public/
├── images/
│   ├── hero/
│   ├── profiles/
│   ├── modules/
│   ├── testimonials/
│   └── brand/
└── animations/ (opcional)
```

---

## 🎨 Assets Necessários

### 1. Hero Section - Elemento Visual Principal

**Local:** `components/landing/hero.tsx` (linha 108-163)

**Asset necessário:**
- **Arquivo:** `/public/images/hero/main-visual.png` ou `.svg`
- **Dimensões:** 600x600px (square) ou 800x600px (landscape)
- **Formato:** PNG com transparência OU SVG
- **Conteúdo sugerido:**
  - Ilustração abstrata representando IA + Prática
  - Mockup de ebook/dashboard
  - Composição com ícones de ferramentas (ChatGPT, Canva, etc)
  - Diagrama do fluxo: Ideia → IA → Produto Real

**Alternativas:**
1. **Ilustração SVG animada** (CSS animations)
2. **Mockup 3D** de ebook/interface
3. **Composição isométrica** de workspace digital

**Código atual:**
```tsx
{/* Central card */}
<div className="relative h-full glass-card flex flex-col items-center justify-center text-center p-8">
  {/* AQUI: Adicionar imagem antes da quote */}
  <img
    src="/images/hero/main-visual.png"
    alt="Instrumento, não fim"
    className="w-full max-w-md mb-8"
  />

  {/* Quote */}
  <div className="mb-8">
    <p className="text-4xl font-bold mb-4">"</p>
    ...
```

---

### 2. Profiles Section - Avatares/Ícones dos Perfis

**Local:** `components/landing/profiles-section.tsx`

**Assets necessários:**

#### Perfil A - Criador Orgânico
- **Arquivo:** `/public/images/profiles/profile-a.svg`
- **Dimensões:** 200x200px
- **Conteúdo:** Ícone representando conteúdo existente (microfone, câmera, post)

#### Perfil B - Explorador de Nicho
- **Arquivo:** `/public/images/profiles/profile-b.svg`
- **Dimensões:** 200x200px
- **Conteúdo:** Ícone representando pesquisa/exploração (lupa, mapa, bússola)

#### Perfil C - Prestador de Serviço
- **Arquivo:** `/public/images/profiles/profile-c.svg`
- **Dimensões:** 200x200px
- **Conteúdo:** Ícone representando serviço/consultoria (handshake, briefcase)

**Código atual:**
```tsx
{profiles.map((profile) => (
  <div key={profile.id} className="glass-card">
    {/* AQUI: Adicionar imagem do perfil */}
    <img
      src={`/images/profiles/profile-${profile.id.toLowerCase()}.svg`}
      alt={profile.title}
      className="w-32 h-32 mx-auto mb-4"
    />

    <h3>{profile.title}</h3>
    ...
```

---

### 3. Modules Section - Ícones das Fases

**Local:** `components/landing/modules-section.tsx`

**Assets necessários:**

#### Fase 1 - Mentalidade
- **Arquivo:** `/public/images/modules/phase-mindset.svg`
- **Dimensões:** 80x80px
- **Conteúdo:** Brain, lightbulb, or target icon

#### Fase 2 - Decisões
- **Arquivo:** `/public/images/modules/phase-decisions.svg`
- **Dimensões:** 80x80px
- **Conteúdo:** Crossroads, checklist, or compass icon

#### Fase 3 - Validação
- **Arquivo:** `/public/images/modules/phase-validation.svg`
- **Dimensões:** 80x80px
- **Conteúdo:** Magnifying glass, chart, or target with arrow

#### Fase 4 - Prontidão
- **Arquivo:** `/public/images/modules/phase-readiness.svg`
- **Dimensões:** 80x80px
- **Conteúdo:** Checklist complete, rocket, or green flag

#### Fase 5 - Setup
- **Arquivo:** `/public/images/modules/phase-setup.svg`
- **Dimensões:** 80x80px
- **Conteúdo:** Gear, settings, or launch icon

---

### 4. Testimonials Section - Fotos/Avatares

**Local:** `components/landing/testimonials-section.tsx`

**Assets necessários:**

#### Marina (Perfil A)
- **Arquivo:** `/public/images/testimonials/marina.jpg`
- **Dimensões:** 300x300px (square)
- **Formato:** JPG ou WebP
- **Alternativa:** Avatar placeholder com iniciais "M"

#### Ricardo (Perfil B)
- **Arquivo:** `/public/images/testimonials/ricardo.jpg`
- **Dimensões:** 300x300px (square)

#### Juliana (Perfil C)
- **Arquivo:** `/public/images/testimonials/juliana.jpg`
- **Dimensões:** 300x300px (square)

#### Laura (No-Code)
- **Arquivo:** `/public/images/testimonials/laura.jpg`
- **Dimensões:** 300x300px (square)

#### Thiago (Automação)
- **Arquivo:** `/public/images/testimonials/thiago.jpg`
- **Dimensões:** 300x300px (square)

**Nota:** Se não houver fotos reais, use avatares gerados ou iniciais estilizadas.

---

### 5. Brand - Logo e Favicon

**Assets necessários:**

#### Logo @bispo.ia
- **Arquivo:** `/public/images/brand/logo.svg`
- **Dimensões:** Vetorial (SVG)
- **Variantes:**
  - `/public/images/brand/logo-light.svg` (para dark mode)
  - `/public/images/brand/logo-dark.svg` (para light mode)

#### Favicon
- **Arquivo:** `/public/favicon.ico`
- **Dimensões:** 32x32px, 16x16px
- **Formato:** ICO com múltiplas resoluções

#### Apple Touch Icon
- **Arquivo:** `/public/apple-touch-icon.png`
- **Dimensões:** 180x180px
- **Formato:** PNG

#### Open Graph Image
- **Arquivo:** `/public/images/brand/og-image.png`
- **Dimensões:** 1200x630px
- **Formato:** PNG ou JPG
- **Conteúdo:** Preview card para redes sociais com título e branding

---

## 🎬 Assets Opcionais (Nice to Have)

### Animações Lottie/SVG

1. **Hero Animation**
   - `/public/animations/hero-flow.json` (Lottie)
   - Fluxo animado: Ideia → IA → Produto

2. **Loading States**
   - `/public/animations/loading.json`
   - Spinner customizado com branding

3. **Success States**
   - `/public/animations/success.json`
   - Checkmark animado para confirmações

---

## 📊 Priorização

| Prioridade | Asset | Impacto | Esforço |
|------------|-------|---------|---------|
| 🔴 Alta | Hero Main Visual | Alto | Médio |
| 🔴 Alta | Logo SVG | Alto | Baixo |
| 🔴 Alta | Favicon | Médio | Baixo |
| 🟡 Média | Profile Icons (A, B, C) | Médio | Médio |
| 🟡 Média | OG Image | Médio | Baixo |
| 🟢 Baixa | Testimonials Photos | Baixo | Alto |
| 🟢 Baixa | Phase Icons | Baixo | Médio |
| ⚪ Opcional | Animations | Médio | Alto |

---

## 🛠️ Ferramentas Recomendadas

### Para criação:
- **Ilustrações:** Figma, Adobe Illustrator, Canva
- **Ícones:** Lucide Icons (já em uso), Heroicons, Feather Icons
- **Mockups:** Smartmockups, Mockuuups, Figma plugins
- **Animações:** LottieFiles, After Effects, Figma plugins
- **AI Generation:** Midjourney, DALL-E, Stable Diffusion

### Para otimização:
- **SVG:** SVGO, SVGOMG
- **PNG/JPG:** TinyPNG, Squoosh
- **WebP:** cwebp (Google)

---

## 📝 Notas de Implementação

### Placeholder temporário (Hero):

Enquanto os assets não são criados, você pode usar um gradiente animado:

```tsx
<div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-2xl flex items-center justify-center">
  <div className="text-center">
    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-primary opacity-50 blur-xl" />
    <p className="text-lg font-semibold text-muted-foreground">
      Visual em produção
    </p>
  </div>
</div>
```

### Image Component do Next.js:

Sempre use `next/image` para otimização automática:

```tsx
import Image from 'next/image'

<Image
  src="/images/hero/main-visual.png"
  alt="Instrumento, não fim"
  width={600}
  height={600}
  priority
  className="w-full h-auto"
/>
```

---

## ✅ Checklist de Implementação

- [ ] Criar diretório `/public/images/`
- [ ] Hero: Main visual
- [ ] Brand: Logo SVG
- [ ] Brand: Favicon
- [ ] Profiles: Icons A, B, C
- [ ] Modules: Phase icons (5)
- [ ] Testimonials: Photos (5)
- [ ] OG Image para social share
- [ ] Implementar Image components
- [ ] Otimizar todos os assets
- [ ] Testar performance (Lighthouse)

---

*Última atualização: 2026-01-28*
