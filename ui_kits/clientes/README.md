# UI Kit · Clientes

CRM básico do lava-jato. Lista de clientes com filtros, busca, e drawer de detalhe mostrando histórico de serviços.

## Arquivos
- `index.html`
- `AppShell.jsx` — sidebar com "Clientes" ativo.
- `ClientsTable.jsx` — tabela com avatar de iniciais, total gasto, última visita.
- `ClientDrawer.jsx` — drawer com perfil + lista de serviços + veículos cadastrados.

## Estados cobertos
- Filtro Todos / VIP / Inativos
- Busca por nome/telefone
- Cliente sem visitas (placeholder)
- Drawer com tabs (Perfil · Histórico · Veículos)
