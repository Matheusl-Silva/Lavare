# UI Kit · Relatórios

Tela de analytics. Período selecionável (7 dias, 30 dias, ano), KPIs principais e múltiplos gráficos.

## Arquivos
- `index.html`
- `AppShell.jsx` — sidebar com "Relatórios" ativo.
- `RevenueChart.jsx` — gráfico de barras por mês.
- `ServicesDonut.jsx` — donut chart com mix de serviços.
- `TopList.jsx` — lista ordenada (top clientes, top serviços).

## Estados cobertos
- 3 períodos selecionáveis
- Comparativos vs. período anterior
- Empty state se sem dados (omitido — base sintética sempre tem dados)
