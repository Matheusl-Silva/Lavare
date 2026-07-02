# UI Kit · Estoque de Itens

Gestão de produtos e insumos consumidos no lava-jato (shampoo, cera, panos, ceras, descartáveis).

## Arquivos
- `index.html` — tela completa, interativa.
- `AppShell.jsx` — sidebar com "Estoque de itens" ativo.
- `StockKpis.jsx` — KPIs (itens cadastrados, valor em estoque, abaixo do mínimo, vencendo).
- `FilterPills.jsx` — pílulas de filtro por categoria + contadores.
- `ItemsTable.jsx` — tabela com mini barra de estoque, status, ações.
- `ItemDrawer.jsx` — drawer para adicionar produto ou registrar entrada/saída.

## Estados cobertos
- Item com estoque crítico (vermelho)
- Item com estoque baixo (amarelo)
- Item normal
- Filtro por categoria
- Drawer com 2 abas: novo item / movimentar estoque
