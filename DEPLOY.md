# Museum AI — Guia de Deploy

## Pré-requisitos
- Node.js 20+
- Conta na Vercel
- API Key da OpenAI (com acesso ao gpt-4o-realtime-preview)
- PostgreSQL (opcional — app funciona sem banco de dados)

## Deploy Rápido

### 1. Instalar Vercel CLI
```bash
npm i -g vercel
```

### 2. Login na Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel --prod
```

### 4. Variáveis de Ambiente (na Vercel)
```
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...  (opcional)
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
```

## Deploy na Netlify

### 1. Conectar o repositório
- Acesse [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
- Escolha o GitHub e selecione o repositório `giuseppeBertholdi/VIBE-Projeto2026`
- A Netlify detecta o `netlify.toml` automaticamente (build command `npm run build`, plugin `@netlify/plugin-nextjs`)

### 2. Variáveis de Ambiente (Site settings → Environment variables)
```
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...  (opcional)
NEXT_PUBLIC_APP_URL=https://seu-site.netlify.app
ADMIN_SECRET=um-segredo-seu
```

### 3. Deploy
- Clique em **Deploy site** — a Netlify builda e publica automaticamente a cada push na branch `main`

### Alternativa via CLI
```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Desenvolvimento Local
```bash
cd museum-ai
cp .env.local.example .env.local
# Edite .env.local com suas chaves
npm run dev
```

Acesse: http://localhost:3000

## Banco de Dados (opcional)
```bash
# Com PostgreSQL configurado:
npx prisma db push
npx prisma db seed
```

## Estrutura de Pastas
```
museum-ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Galeria (homepage)
│   │   ├── artwork/[slug]/     # Experiência por obra
│   │   ├── about/              # Sobre o projeto
│   │   └── api/
│   │       ├── realtime/token/ # WebRTC ephemeral token
│   │       └── artworks/       # Lista de obras
│   ├── components/
│   │   ├── accessibility/      # LIBRAS, painel de acessibilidade
│   │   ├── artwork/            # Viewer, Info, Discovery, Timeline
│   │   ├── voice/              # VoiceOrb, TranscriptPanel
│   │   ├── gamification/       # AchievementToast
│   │   ├── layout/             # Navbar
│   │   └── ui/                 # Button, Card, Badge
│   ├── hooks/
│   │   ├── useRealtime.ts      # WebRTC + OpenAI Realtime API
│   │   └── useAccessibility.ts # Settings de acessibilidade
│   ├── lib/
│   │   ├── artworks-data.ts    # 10 obras + metadados completos
│   │   └── utils.ts
│   └── types/index.ts
├── prisma/
│   ├── schema.prisma           # Schema completo do banco
│   └── seed.ts                 # Conquistas iniciais
└── vercel.json
```

## Funcionalidades Implementadas
- ✅ Galeria com 10 obras-primas
- ✅ Experiência por obra com design temático
- ✅ Assistente de voz (OpenAI Realtime API + WebRTC)
- ✅ Transcrição em tempo real (legendas)
- ✅ LIBRAS via VLibras (gov.br)
- ✅ Painel de acessibilidade (WCAG 2.2 AAA)
  - Alto contraste
  - Fonte para dislexia (OpenDyslexic)
  - Ajuste de tamanho de fonte
  - Movimento reduzido
  - Legendas
- ✅ Modo Descoberta (detalhes ocultos, simbolismo, teorias)
- ✅ Linha do Tempo
- ✅ Viewer com zoom e hotspots
- ✅ Perguntas rápidas
- ✅ Seletor de nível (Criança/Adolescente/Adulto/Especialista)
- ✅ Sistema de conquistas
- ✅ API rate limiting
- ✅ SEO (metadata, OpenGraph, sitemap, robots.txt)
- ✅ Build otimizado (SSG para obras, Edge para API)
- ✅ Schema Prisma completo
