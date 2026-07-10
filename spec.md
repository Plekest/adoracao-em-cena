# Plano de Implementação: Site Adoração em Cena

## Visão Geral

Criar o site de divulgação do grupo de drama/teatro "Adoração em Cena", em Astro, com uma Home single-page dinâmica e cheia de animação (estilo cinematográfico), mais duas páginas: Contato (clean) e Portfólio (estrutura pronta, conteúdo populado depois). Paleta "Poison & Pearls" (obsidian black, crimson depth, warm sand, soft pearl), com vermelho usado só em detalhes pontuais.

## Análise do Estado Atual

- Projeto Astro 7 recém-criado via template `minimal` ([package.json](package.json), [astro.config.mjs](astro.config.mjs)).
- Único arquivo de conteúdo é [src/pages/index.astro](src/pages/index.astro), com apenas um `<h1>Adoração em Cena</h1>` placeholder.
- Não há componentes, estilos, fontes ou dependências além do próprio Astro.
- Assets disponíveis: `Logo.png` (script dourado "Adoração em Cena" + silhueta de dançarino + "GRUPO DE DRAMA", fundo transparente/branco), em `C:\Users\PHTFp\Downloads\drive-download-20260710T130635Z-2-001\Logo.png`. Sem versão vetorial (SVG) disponível — será usada como PNG por ora.
- Pasta "Arte Vestuários" contém artes de camisetas/agasalhos (CDR/PDF) — fora de escopo deste site por enquanto.
- Instagram do grupo: https://www.instagram.com/t7adoracaoemcena/ (não foi possível raspar o conteúdo automaticamente — sem acesso via WebFetch/browser neste ambiente).

### Descobertas Chave:
- Não há nenhum design system, tokens de cor ou fontes definidos — tudo será criado do zero.
- Não há sistema de imagens/carrossel — o carrossel da Home terá poucas imagens de placeholder até você adicionar fotos reais do grupo.
- Contato usará dados fictícios (WhatsApp/e-mail) até você fornecer os reais — ficam marcados com comentário `TODO` fácil de achar.

## Estado Final Desejado

Um site Astro com 3 rotas (`/`, `/contato`, `/portfolio`), com:
- Home densa, animada com GSAP + ScrollTrigger, contando a "história" do grupo ao rolar a página, com carrossel de imagens.
- Contato limpo com WhatsApp, Instagram e e-mail (dados fictícios por enquanto).
- Portfólio com grid pronto para receber peças (nome, fotos, vídeo, descrição), hoje com placeholders "em breve".
- Visual fiel à paleta Poison & Pearls e à identidade da logo (dourado + preto + toques de vermelho).
- Responsivo (mobile/tablet/desktop), performático (Lighthouse > 90 em Performance/Acessibilidade) e pronto para deploy na Vercel (plano free).

Verificação: `npm run build` sem erros, `npm run preview` navegável nas 3 rotas, revisão visual manual em mobile e desktop.

## Decisões de Design

- **Paleta** (`src/styles/tokens.css` como CSS custom properties):
  - `--obsidian: #0D0B0C` (fundo)
  - `--crimson: #8C1D2B` (detalhes: hover, sublinhados, ícones pontuais)
  - `--sand: #C9A66B` (cor de destaque/dourado, títulos, bordas)
  - `--pearl: #F2ECE4` (texto principal sobre fundo escuro)
- **Tipografia**: `Playfair Display` (serif dramática, casa com o script da logo) para títulos/headlines, `Inter` para corpo de texto. Ambas via `@fontsource` (self-hosted, sem chamada externa ao Google Fonts — melhor performance/privacidade).
- **Animação**: GSAP + `ScrollTrigger` para reveals presos ao scroll, parallax leve no hero, efeito de "cortina abrindo" na entrada, texto do hero animado com `SplitText`-like (quebra manual em spans, já que SplitText é plugin pago — usaremos alternativa open-source ou animação por palavra/linha via CSS+GSAP). `Lenis` para smooth scroll opcional (avaliar na Fase 2 se o scroll nativo já ficar bom o suficiente — evita dependência extra se não for necessária).
- **Estrutura de páginas**: multi-página com `src/layouts/BaseLayout.astro` compartilhado (nav fixo + footer), evitando duplicação entre `/`, `/contato`, `/portfolio`.

## Fases de Implementação

### Fase 1: Fundação (tokens, fontes, layout base, assets)

**Objetivo**: Ter a base visual e estrutural pronta para construir as páginas em cima.

**Mudanças**:

1. `public/logo.png` — mover a logo fornecida para dentro do projeto.
2. `src/styles/tokens.css` — variáveis de cor, espaçamento, tipografia.
3. `src/styles/global.css` — reset básico + estilos globais (fontes, cores base, seleção de texto customizada).
4. Instalar dependências: `astro add` não necessário; `npm install gsap @fontsource/playfair-display @fontsource/inter`.
5. `src/layouts/BaseLayout.astro` — `<head>` com meta tags (SEO básico, Open Graph, favicon já existente), import dos estilos globais, slot para conteúdo.
6. `src/components/Nav.astro` — navegação fixa/transparente-no-topo com logo + links (Home, Portfólio, Contato) + link Instagram; menu mobile (hamburguer simples).
7. `src/components/Footer.astro` — logo pequena, links de redes sociais, copyright.

**Critérios de Sucesso**:

Automatizados:
- [x] `npm run build` roda sem erros
- [x] `npm run astro check` sem erros de tipos

Manuais:
- [ ] Nav e footer aparecem corretamente em todas as páginas (mesmo vazias)
- [ ] Fontes carregando corretamente (sem FOUT perceptível)

---

### Fase 2: Home — Hero + Seção "Sobre" animados

**Objetivo**: Primeira impressão de impacto: hero cinematográfico + apresentação do grupo.

**Mudanças**:

1. `src/pages/index.astro` — monta a Home a partir dos componentes de seção abaixo.
2. `src/components/home/Hero.astro` — logo grande centralizada, animação de entrada tipo "cortina abrindo" (dois painéis obsidian que se abrem lateralmente revelando a logo), leve parallax no scroll, seta/indicador de "scroll down".
3. `src/components/home/Sobre.astro` — texto curto sobre o grupo (missão/propósito do "Adoração em Cena"), com reveal de texto ao entrar no viewport (fade + translateY via ScrollTrigger).
4. `src/scripts/gsap-setup.ts` — registro central do GSAP + ScrollTrigger, importado via `<script>` nas páginas que precisam.

**Critérios de Sucesso**:

Automatizados:
- [x] Build passa sem erros
- [ ] Sem erros no console do browser relacionados a GSAP/ScrollTrigger

Manuais:
- [ ] Animação do hero roda suave em desktop e mobile (sem jank perceptível)
- [ ] Texto da seção "Sobre" anima ao rolar até ele
- [ ] Sem "flash" de conteúdo não estilizado antes da animação

---

### Fase 3: Home — Carrossel + Seção de destaque/CTA

**Objetivo**: Completar a Home com o carrossel de imagens e uma chamada final para Instagram/Portfólio.

**Mudanças**:

1. `src/components/home/Carrossel.astro` — carrossel simples (CSS scroll-snap + poucos controles JS, sem lib pesada tipo Swiper para manter o bundle leve), populado com 3-5 imagens placeholder em `public/carrossel/` (você troca depois pelas fotos reais).
2. `src/components/home/Destaque.astro` — seção com frase de efeito/citação do grupo + dois CTAs (botão para Instagram, botão para Portfólio), com leve animação de entrada.
3. Ajustar `Footer.astro` se necessário para reforçar CTA de contato.

**Critérios de Sucesso**:

Automatizados:
- [x] Build passa sem erros

Manuais:
- [ ] Carrossel funciona por swipe (mobile) e por clique nas setas (desktop)
- [ ] CTAs levam para os lugares certos (Instagram externo, /portfolio interno)

---

### Fase 4: Página Contato

**Objetivo**: Página clean com os 3 canais de contato.

**Mudanças**:

1. `src/pages/contato.astro` — usa `BaseLayout`, título de seção, e 3 cards/botões: WhatsApp (`https://wa.me/55XXXXXXXXXXX` — número fictício com comentário `<!-- TODO: trocar pelo WhatsApp real -->`), Instagram (link real: `https://www.instagram.com/t7adoracaoemcena/`), E-mail (`contato@adoracaoemcena.fictício` com `TODO`).
2. Leve animação de entrada nos cards (stagger simples via GSAP ou só CSS, já que a página é mais enxuta).

**Critérios de Sucesso**:

Automatizados:
- [x] Build passa sem erros

Manuais:
- [ ] Link do Instagram abre o perfil correto
- [ ] Botão WhatsApp abre `wa.me` com o número placeholder (a trocar depois)
- [ ] Página está visualmente "clean" conforme pedido (pouco texto, bem espaçada)

---

### Fase 5: Página Portfólio (estrutura + placeholder)

**Objetivo**: Deixar a estrutura pronta para você popular com as peças depois, sem bloquear o lançamento do site.

**Mudanças**:

1. `src/content/portfolio/` (content collection do Astro) — schema em `src/content.config.ts` (content layer API do Astro 7) com campos: `titulo`, `descricao`, `fotos` (array de imagens), `video` (opcional, URL), `data` (opcional).
2. `src/pages/portfolio.astro` — grid de cards a partir da collection; se a collection estiver vazia, mostra estado "Em breve — novidades em cena" estilizado (não uma tela quebrada/vazia feia).
3. `src/content/portfolio/_modelo.txt` — guia de formato (não é `.md`, então não vira card) explicando os campos esperados para quando você for adicionar peças reais.

**Critérios de Sucesso**:

Automatizados:
- [x] Build passa sem erros com a collection vazia e com um item de exemplo

Manuais:
- [ ] Estado vazio fica bonito, não parece "página quebrada"
- [ ] Adicionar um arquivo `.md` de teste em `src/content/portfolio/` faz o card aparecer automaticamente no grid

---

### Fase 6: Polimento, responsividade e deploy

**Objetivo**: Garantir qualidade cross-device e publicar.

**Mudanças**:

1. Revisão de responsividade em breakpoints mobile/tablet/desktop nas 3 páginas.
2. Meta tags de SEO/Open Graph completas (título, descrição, imagem de compartilhamento usando a logo) em `BaseLayout.astro`.
3. Checagem de performance (lazy loading de imagens do carrossel/portfólio via `astro:assets`).
4. Conectar repositório à Vercel (plano Free/Hobby) e configurar domínio (se houver).

**Critérios de Sucesso**:

Automatizados:
- [x] `npm run build` sem erros ou warnings relevantes
- [ ] Lighthouse (rodado localmente ou via Vercel) com Performance e Acessibilidade acima de 90

Manuais:
- [ ] Navegação testada em um celular real ou emulado
- [ ] Deploy na Vercel acessível publicamente e funcionando

## Notas de Implementação

- WhatsApp e e-mail de contato são **fictícios/placeholder** por decisão do usuário — marcados com `TODO` no código para fácil substituição futura.
- Logo está apenas em PNG. Não há ferramenta de vetorização (potrace/ImageMagick/Inkscape) disponível neste ambiente para gerar um SVG confiável agora. Sugestão: usar https://vectorizer.ai (gratuito para uso simples) ou o usuário já mencionou que pode gerar uma versão melhorada depois — trocar o asset quando disponível, sem mudar a estrutura do componente (`<Image src="/logo.png">` → `<Image src="/logo.svg">`).
- Conteúdo do Instagram não foi raspado automaticamente (sem acesso de browser neste ambiente) — textos "Sobre o grupo" na Home serão redigidos de forma genérica/segura sobre um grupo de teatro/drama cristão e devem ser revisados por você antes de publicar.
- Pasta "Arte Vestuários" não é usada neste projeto (fora de escopo).
- Sem formulário de contato (decisão do usuário) — não requer backend/serviço de envio de e-mail, mantendo o site 100% estático.

## Questões em Aberto

Nenhuma — todas as decisões necessárias para iniciar a implementação foram tomadas. Itens que dependem de você (WhatsApp/e-mail reais, fotos do grupo, conteúdo do portfólio, logo vetorizada) estão marcados como placeholders substituíveis nas fases acima, não como bloqueios.
