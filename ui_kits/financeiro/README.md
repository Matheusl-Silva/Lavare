# UI Kit · Financeiro

Dashboard de controle financeiro do Lavare. Mostra movimentações do dia/período, KPIs principais, fluxo de caixa visual e tabela detalhada com filtros.

## Arquivos

- `index.html` — tela completa, interativa (botão "Nova movimentação" abre o drawer; filtros funcionam; trocar período recalcula KPIs).
- `AppShell.jsx` — sidebar + header compartilhados entre kits.
- `KpiRow.jsx` — linha de 4 KPIs (entradas, saídas, saldo, ticket médio).
- `CashflowChart.jsx` — gráfico de área SVG de fluxo de caixa últimos 7 dias.
- `TransactionsTable.jsx` — tabela de movimentações com badge de método e ações por linha.
- `MovementDrawer.jsx` — drawer lateral para registrar nova movimentação (entrada ou saída).

## Estados cobertos
- Tabela vazia (`Nenhuma movimentação encontrada`)
- Hover de linha
- Filtro por período (hoje, 7 dias, 30 dias, mês)
- Drawer com validação de campos
- Toast de confirmação após salvar
