---
name: lavare-design
description: Use this skill to generate well-branded interfaces and assets for Lavare (SaaS de gestão para lava-jatos), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Lavare Design Skill

Lavare é um SaaS de gestão para lava-jatos. Cobre três áreas: controle financeiro, estoque de itens (produtos/insumos) e fila de carros (veículos em atendimento).

## Como começar
1. Leia o `README.md` deste skill para entender o sistema completo: fundamentos de copy, fundamentos visuais, iconografia, e índice de arquivos.
2. Importe os tokens em qualquer artefato: `colors_and_type.css` define todas as variáveis CSS de cor, tipo, espaço, raio, sombra e motion.
3. Para componentes prontos, use os UI kits em `ui_kits/`:
   - `financeiro/` — dashboard, KPIs, gráficos, tabelas de movimentação, drawer de nova movimentação.
   - `estoque-itens/` — lista com filtros, barra de estoque, drawer.
   - `estoque-carros/` — kanban operacional, card de carro, modal de cadastro.
   Os componentes compartilham `ui_kits/kit.css` (estilos comuns como sidebar, header, botões, inputs, tabelas, drawer, modal, toast).

## Princípios não-negociáveis
- **Português brasileiro formal, mas direto.** Tratar o usuário como "você". Verbos no infinitivo em botões ("Registrar entrada", "Adicionar item").
- **Sem emoji.** Em lugar nenhum da UI.
- **Sem gradientes ambientes.** Permitido apenas em fills de gráfico.
- **Sem fotografia.** Avatares são iniciais sobre fundo colorido sólido.
- **Modo claro apenas.**
- **Densidade média.** Linhas de tabela 44px, padding de card 20–24px.
- **Cor primária é azul `#0EA5E9`**. Use cores semânticas (success/warning/danger) apenas para estados e dados, nunca para decoração.
- **Iconografia: Lucide via CDN**, stroke 1.75, `currentColor`. Nunca usar emoji.
- **Tipografia: Inter** (sans) + **JetBrains Mono** (números tabulares e códigos).

## Como criar artefatos com este skill
- Para **slides/mocks/protótipos throwaway**: copie `assets/`, `colors_and_type.css` e referencie. Crie HTMLs estáticos seguindo os fundamentos do README.
- Para **código de produção**: use as variáveis CSS como tokens. Os JSX dos UI kits são modulares mas simplificados — em produção, refatore para uma stack real, mantendo nomes de classes e fundamentos visuais.

Se o usuário invocar este skill sem outras instruções, pergunte o que ele quer construir/desenhar, faça perguntas, e atue como designer especialista entregando ou HTML ou código de produção, conforme necessidade.
