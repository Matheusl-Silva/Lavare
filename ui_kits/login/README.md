# UI Kit · Login

Tela de autenticação. Split-screen: formulário à esquerda, painel de marca à direita.

## Arquivos
- `index.html` — login completo, com alternância entre "Entrar" e "Criar conta".
- `LoginForm.jsx` — formulário com validação inline.
- `BrandPanel.jsx` — painel decorativo da marca com tagline.

## Estados cobertos
- Email/senha vazios → botão desabilitado.
- Erro de credenciais (simulado se email = `erro@lavare.com`).
- Toggle "Mostrar senha".
- Tela alternativa de "Criar conta" com campos extras.
