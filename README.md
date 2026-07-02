# Lavare — Design System

Sistema de design para **Lavare**, um SaaS de gestão para lava-jatos. O produto cobre três grandes áreas:

1. **Controle Financeiro** — movimentações (entradas/saídas), fluxo de caixa, recebíveis.
2. **Estoque de Itens** — produtos e insumos consumidos nas lavagens (shampoo, cera, panos, etc).
3. **Estoque/Fila de Carros** — veículos em atendimento, status de cada lavagem, histórico.

**Público:** donos do lava-jato (gestão) + funcionários/operadores. A UI precisa servir tanto leitura analítica (gráficos, totais) quanto operação rápida (registrar carro, dar baixa em item).

## Fontes consultadas

> O usuário **não** forneceu Figma, codebase, logo ou paleta definida. Apenas estas pistas: vibe profissional/corporativo (Stripe/Linear), cor primária **azul (#0EA5E9 family)**, sans-serif geométrica neutra, português formal, densidade média, **modo claro apenas**.

Tudo neste sistema foi criado do zero seguindo essa direção. **Antes de usar em produção, valide com o usuário** — especialmente logo, nome e tom.

---

## Content Fundamentals

**Idioma:** português brasileiro, formal mas não rebuscado. Trata o usuário como **"você"** (não "tu", não "prezado").

**Tom de voz:**
- Direto, calmo, factual. Sem entusiasmo artificial, sem exclamações.
- O produto fala como um relatório bem feito, não como um vendedor.
- Quando há ação destrutiva, é literal: "Excluir movimentação" (não "remover", não "deletar").
- Mensagens de sistema curtas e completas. Verbos no infinitivo em botões ("Registrar entrada", "Adicionar item").

**Casing:**
- Títulos de tela e seções: **Sentence case** ("Controle financeiro", não "Controle Financeiro").
- Botões: **Sentence case** ("Nova movimentação").
- Labels de campo: **Sentence case** ("Forma de pagamento").
- Rótulos curtos de status: **Sentence case** ("Em andamento", "Pago", "Pendente").

**Números e dinheiro:**
- Reais sempre com prefixo `R$` e separador de milhar por ponto, decimal por vírgula: `R$ 1.250,00`.
- Datas no formato `dd/mm/aaaa` ou `dd MMM` ("14 mai").
- Horários em 24h: `14:30`.
- Placas no padrão Mercosul em caixa alta: `ABC1D23`.

**Emoji:** não usar. Em lugar nenhum da UI.

**Exemplos reais de copy:**

| Contexto | Texto |
|---|---|
| Empty state financeiro | "Nenhuma movimentação registrada hoje." |
| Botão primário | "Registrar entrada" |
| Confirmação destrutiva | "Excluir esta movimentação? Esta ação não pode ser desfeita." |
| Status de carro | "Em lavagem", "Aguardando", "Pronto para retirada" |
| Aviso de estoque | "Estoque baixo — 3 unidades restantes" |
| Header de tabela | "Data", "Descrição", "Forma de pagamento", "Valor" |

---

## Visual Foundations

### Cores
- **Primária:** azul `#0EA5E9` (sky-500). Usada em botões primários, links, indicadores de seleção, gráficos principais.
- **Tinta de texto:** `#0F172A` (slate-900) para texto principal; `#475569` (slate-600) para secundário; `#94A3B8` (slate-400) para terciário/placeholders.
- **Superfícies:** fundo da página `#F8FAFC` (slate-50); cards e tabelas `#FFFFFF`; bordas `#E2E8F0` (slate-200); divisores sutis `#F1F5F9` (slate-100).
- **Semânticas:** sucesso `#10B981` (emerald-500), aviso `#F59E0B` (amber-500), erro `#EF4444` (red-500), info `#0EA5E9` (sky-500).
- **Sem gradientes** em UI. Permitido apenas em chart fills (ex.: area chart com sky-500 → transparente).

### Tipografia
- **Família:** Inter (Google Fonts), pesos 400 / 500 / 600 / 700. Variável.
- **Mono para números tabulares e códigos:** JetBrains Mono.
- **Escala:** display 32 / h1 24 / h2 20 / h3 18 / body 14 / small 13 / caption 12. Line-height 1.4–1.5 em corpo, 1.2 em títulos.
- **Tracking:** -0.01em em títulos ≥ 20px; 0 no corpo; +0.04em uppercase em micro-labels.

### Espaçamento e densidade
- Escala em múltiplos de **4px**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.
- **Densidade média:** linhas de tabela com 44px de altura; padding de card 20–24px; gap entre seções 24–32px.
- **Container max-width** da área de conteúdo: 1280px. Sidebar 240px.

### Cantos e bordas
- Raio padrão de cards e inputs: **8px**.
- Botões: **8px**.
- Pílulas/badges: **999px**.
- Modal e popovers: **12px**.
- Bordas sempre 1px sólidas em `--border-default`. Sem bordas duplas, sem outlines decorativos.

### Sombras (sistema de elevação)
- `shadow-xs` — `0 1px 2px rgba(15,23,42,0.04)` — botões, inputs hover.
- `shadow-sm` — `0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)` — cards.
- `shadow-md` — `0 4px 12px rgba(15,23,42,0.08)` — dropdowns, popovers.
- `shadow-lg` — `0 12px 32px rgba(15,23,42,0.12)` — modais.
- **Sem sombras coloridas.** Sempre slate-900 com baixa opacidade.

### Backgrounds
- 100% sólidos. Sem imagens de fundo, sem padrões, sem ruído, sem gradients ambientes.
- Hierarquia exclusivamente por cor de superfície + sombra leve.

### Animação
- **Easing padrão:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo, suave).
- **Durações:** 120ms (hover/press), 200ms (state changes), 320ms (entrada de modais/menus).
- Modais: fade + scale 0.96 → 1.
- Menus/dropdowns: fade + translateY(-4px → 0).
- **Sem bounces, sem spring elástico.** O produto não brinca.

### Estados
- **Hover:** superfícies clicáveis escurecem 4–6% (ex.: linha de tabela vai de branco para `#F8FAFC`). Botão primário escurece ~8%.
- **Active/press:** mesmo do hover + scale 0.99 brevemente em botões. Sem reposicionar.
- **Focus:** ring 2px azul `#0EA5E9` com offset 2px contra a superfície (`box-shadow: 0 0 0 2px #fff, 0 0 0 4px #0EA5E9`).
- **Disabled:** opacidade 50%, cursor `not-allowed`. Sem mudança de cor de fundo.
- **Selecionado** (linha/item): fundo `#EFF6FF` (sky-50) + borda esquerda 2px sky-500 ou check icon.

### Transparência e blur
- Usada apenas em **overlay de modal**: `rgba(15,23,42,0.4)` com `backdrop-filter: blur(4px)`.
- Não usar em nenhum outro contexto (nada de "glassmorphism" em cards).

### Layout
- Sidebar fixa à esquerda (240px) em desktop. Header fixo no topo (64px) com busca + perfil.
- Conteúdo rola; sidebar e header não rolam.
- Tabelas com cabeçalho sticky dentro do card.
- Páginas começam com title (32px display) + subtitle opcional + ação primária à direita.

### Imagery
- O produto não usa fotografia. Avatares são iniciais sobre fundo colorido sólido derivado do nome.
- Logos de bandeira de cartão (Visa/Master/Pix) e ícones de método de pagamento — em produção, usar SVGs oficiais; aqui usamos placeholders.

---

## Iconography

- **Sistema:** [Lucide Icons](https://lucide.dev) via CDN (`https://unpkg.com/lucide@latest`). Trazos consistentes (1.5px), estilo line, cantos arredondados — combina com o tom corporativo limpo.
- **Tamanhos:** 16px (inline em texto small), 18px (botões), 20px (sidebar/header), 24px (estados vazios).
- **Stroke:** 1.75 padrão.
- **Cor:** herda `currentColor`. Em sidebar, slate-500; ativo, sky-500. Em botões primários, branco.
- **Emoji:** **nunca**.
- **Unicode/símbolos:** apenas setas curtas (`→`, `↑`, `↓`) em micro-contextos quando o ícone seria exagero (ex.: indicador de variação % em KPI).
- **Bandeiras de pagamento e logos de marca:** SVG oficial copiado em `assets/`. Quando ausente, placeholder sóbrio com label de texto.

> **Substituição sinalizada:** Lucide foi escolhido como padrão por consistência visual com Stripe/Linear. Se quiser trocar por Heroicons, Phosphor ou um set próprio, é trocar a referência de CDN.

---

## Index — arquivos deste sistema

```
README.md              ← este arquivo
SKILL.md               ← instruções para uso como Agent Skill
colors_and_type.css    ← tokens CSS (vars de cor, tipo, espaço, sombra)
fonts/                 ← (Inter e JetBrains Mono via Google Fonts CDN — sem arquivos locais)
assets/
  logo.svg             ← logo Lavare horizontal
  logo-mark.svg        ← marca isolada
  favicon.svg
preview/               ← cards renderizados na aba Design System
ui_kits/
  kit.css              ← estilos compartilhados entre kits
  login/               ← Login (split-screen)
  financeiro/          ← Dashboard Financeiro (movimentações)
  estoque-itens/       ← Estoque de itens
  estoque-carros/      ← Fila/estoque de carros
  clientes/            ← CRM (lista + detalhe)
  relatorios/          ← Analytics
  configuracoes/       ← Configurações tabuladas
```

### UI Kits

| Kit | Descrição | Entrada |
|---|---|---|
| `login` | Tela de autenticação split-screen com brand panel à direita | `ui_kits/login/index.html` |
| `financeiro` | Dashboard com KPIs, gráfico de fluxo de caixa, tabela de movimentações, drawer de nova movimentação | `ui_kits/financeiro/index.html` |
| `estoque-itens` | Lista de produtos com filtros, indicadores de estoque baixo, modal de entrada/saída | `ui_kits/estoque-itens/index.html` |
| `estoque-carros` | Fila de veículos por status (aguardando / em lavagem / pronto), card detalhado | `ui_kits/estoque-carros/index.html` |
| `clientes` | CRM básico com lista de clientes, drawer de detalhe com histórico e veículos | `ui_kits/clientes/index.html` |
| `relatorios` | Tela analítica com KPIs, barra de receita por mês, donut de mix de serviços, top-lists | `ui_kits/relatorios/index.html` |
| `configuracoes` | Configurações tabuladas: perfil, empresa, usuários, pagamentos, notificações, integrações | `ui_kits/configuracoes/index.html` |

> Todos os kits compartilham `ui_kits/kit.css` (estilos comuns) e seguem `colors_and_type.css` (tokens).

---

## Notas e ressalvas

- **Logo:** criada do zero como wordmark + marca circular azul. Sujeita à validação.
- **Nome "Lavare":** assumido pelo título do projeto. Trocar se for outro.
- **Fontes:** Inter + JetBrains Mono carregadas via Google Fonts CDN. Caso queira arquivos locais, pedir.
- **Ícones:** Lucide via CDN — sem arquivos locais. Substituível.
