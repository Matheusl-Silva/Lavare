# UI Kit · Fila de Carros

Tela operacional para acompanhar veículos em atendimento. Visualização em colunas (kanban) por status: Aguardando → Em lavagem → Pronto para retirada.

## Arquivos
- `index.html` — board completo + lista de histórico.
- `AppShell.jsx` — sidebar com "Fila de carros" ativo.
- `QueueStats.jsx` — barra de estatísticas operacionais do dia.
- `CarKanban.jsx` — colunas com cards de carros, com botões para avançar status.
- `CarCard.jsx` — card individual de carro (placa, modelo, serviço, tempo, cliente).
- `NewCarModal.jsx` — modal para registrar novo veículo na fila.

## Estados cobertos
- Coluna vazia com placeholder
- Card em cada status (cores diferentes)
- Tempo decorrido por carro
- Modal com validação de placa Mercosul
