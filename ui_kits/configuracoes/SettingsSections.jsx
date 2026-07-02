/* global React, Icon */

function Section({ title, description, children }) {
  return (
    <div className="lv-set-section">
      <div className="lv-set-section__head">
        <h2 className="h2">{title}</h2>
        {description && <p className="lv-set-section__desc">{description}</p>}
      </div>
      <div className="lv-set-section__body">{children}</div>
    </div>
  );
}

function ProfileSection() {
  return (
    <Section title="Perfil" description="Estas informações aparecem para outros membros da equipe.">
      <div className="lv-set-row">
        <label>Foto de perfil</label>
        <div className="lv-set-photo">
          <div className="lv-avatar lv-avatar--lg" style={{ background: '#0EA5E9' }}>RM</div>
          <div className="lv-set-photo__actions">
            <button className="lv-btn lv-btn--secondary lv-btn--sm">Trocar foto</button>
            <button className="lv-btn lv-btn--ghost lv-btn--sm">Remover</button>
          </div>
        </div>
      </div>
      <div className="lv-set-row">
        <label>Nome completo</label>
        <input className="lv-input" defaultValue="Roberto Mendes" />
      </div>
      <div className="lv-set-row">
        <label>Email</label>
        <input className="lv-input" type="email" defaultValue="roberto@lavajatoaquabrillho.com.br" />
      </div>
      <div className="lv-set-row">
        <label>Telefone</label>
        <input className="lv-input tabular" defaultValue="(11) 98765-4321" />
      </div>
      <div className="lv-set-row">
        <label>Idioma</label>
        <select className="lv-input"><option>Português (Brasil)</option><option>English</option><option>Español</option></select>
      </div>
      <div className="lv-set-actions">
        <button className="lv-btn lv-btn--ghost">Cancelar</button>
        <button className="lv-btn lv-btn--primary">Salvar alterações</button>
      </div>
    </Section>
  );
}

function BusinessSection() {
  return (
    <Section title="Empresa" description="Dados que aparecem em notas, recibos e relatórios exportados.">
      <div className="lv-set-row">
        <label>Razão social</label>
        <input className="lv-input" defaultValue="Lava-jato Aqua Brilho Ltda." />
      </div>
      <div className="lv-set-row-2">
        <div className="lv-set-row">
          <label>CNPJ</label>
          <input className="lv-input tabular" defaultValue="12.345.678/0001-90" />
        </div>
        <div className="lv-set-row">
          <label>Inscrição estadual</label>
          <input className="lv-input tabular" defaultValue="123.456.789.000" />
        </div>
      </div>
      <div className="lv-set-row">
        <label>Endereço</label>
        <input className="lv-input" defaultValue="Av. Brigadeiro Faria Lima, 1500 — Itaim Bibi, São Paulo / SP" />
      </div>
      <div className="lv-set-row-2">
        <div className="lv-set-row">
          <label>Telefone comercial</label>
          <input className="lv-input tabular" defaultValue="(11) 3000-1234" />
        </div>
        <div className="lv-set-row">
          <label>Horário de funcionamento</label>
          <input className="lv-input" defaultValue="Seg–Sáb · 08:00 às 19:00" />
        </div>
      </div>
      <div className="lv-set-actions">
        <button className="lv-btn lv-btn--ghost">Cancelar</button>
        <button className="lv-btn lv-btn--primary">Salvar alterações</button>
      </div>
    </Section>
  );
}

function UsersSection() {
  const users = [
    { name: 'Roberto Mendes',  email: 'roberto@lavajato.com.br',  role: 'Proprietário', tier: 'owner',   last: 'agora' },
    { name: 'Juliana Souza',   email: 'juliana@lavajato.com.br',  role: 'Gerente',      tier: 'admin',   last: 'há 2 h' },
    { name: 'Pedro Oliveira',  email: 'pedro@lavajato.com.br',    role: 'Operador',     tier: 'member',  last: 'há 4 h' },
    { name: 'Lucas Santos',    email: 'lucas@lavajato.com.br',    role: 'Operador',     tier: 'member',  last: 'ontem' },
    { name: 'Camila Almeida',  email: 'camila@lavajato.com.br',   role: 'Operador',     tier: 'member',  last: 'há 3 dias' },
  ];
  const roleColor = {
    owner:  { bg: 'var(--brand-50)',   fg: 'var(--brand-700)' },
    admin:  { bg: 'var(--warning-50)', fg: 'var(--warning-700)' },
    member: { bg: 'var(--slate-100)',  fg: 'var(--slate-700)' },
  };
  return (
    <Section title="Usuários e permissões" description="Gerencie quem tem acesso ao sistema e quais permissões cada um possui.">
      <div className="lv-set-toolbar">
        <span className="lv-card__sub">{users.length} usuários ativos</span>
        <button className="lv-btn lv-btn--primary lv-btn--sm"><Icon name="user-plus" size={14} stroke={2} /> Convidar usuário</button>
      </div>
      <div className="lv-user-list">
        {users.map(u => (
          <div key={u.email} className="lv-user-row">
            <div className="lv-avatar lv-avatar--md" style={{ background: 'var(--slate-500)' }}>{u.name.split(' ').slice(0,2).map(p => p[0]).join('')}</div>
            <div className="lv-cell-stack" style={{ flex: 1 }}>
              <span style={{ fontWeight: 500 }}>{u.name}</span>
              <span className="lv-cell-stack__sub">{u.email}</span>
            </div>
            <span className="lv-badge-role" style={{ background: roleColor[u.tier].bg, color: roleColor[u.tier].fg }}>{u.role}</span>
            <span className="lv-cell-stack__sub" style={{ minWidth: 80, textAlign: 'right' }}>{u.last}</span>
            <button className="lv-icon-btn lv-icon-btn--sm"><Icon name="more-horizontal" size={16} /></button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function PaymentsSection() {
  const methods = [
    { id: 'pix',      label: 'Pix',                 enabled: true,  fee: '0%',     desc: 'Pagamentos instantâneos sem taxa' },
    { id: 'cash',     label: 'Dinheiro',            enabled: true,  fee: '0%',     desc: 'Recebimento físico no caixa' },
    { id: 'credit',   label: 'Cartão de crédito',   enabled: true,  fee: '3,2%',   desc: 'Maquininha física integrada' },
    { id: 'debit',    label: 'Cartão de débito',    enabled: true,  fee: '1,8%',   desc: 'Maquininha física integrada' },
    { id: 'voucher',  label: 'Vale benefícios',     enabled: false, fee: '5,5%',   desc: 'VR, Sodexo, Alelo, Ticket' },
    { id: 'transfer', label: 'Transferência bancária', enabled: false, fee: '0%',  desc: 'TED ou DOC manual' },
  ];
  return (
    <Section title="Métodos de pagamento" description="Defina quais formas de pagamento o lava-jato aceita.">
      <div className="lv-payments-list">
        {methods.map(m => (
          <Toggle key={m.id} label={m.label} description={m.desc} fee={m.fee} defaultOn={m.enabled} />
        ))}
      </div>
    </Section>
  );
}

function NotificationsSection() {
  const groups = [
    {
      title: 'Operação', items: [
        { label: 'Carro pronto para retirada', desc: 'Receber notificação quando o serviço for concluído', on: true },
        { label: 'Estoque baixo',              desc: 'Alertar quando um item atingir o mínimo configurado', on: true },
        { label: 'Carro aguardando há 30 min', desc: 'Lembrete de carros parados na fila', on: false },
      ]
    },
    {
      title: 'Financeiro', items: [
        { label: 'Resumo diário do caixa',     desc: 'Email às 20h com as movimentações do dia', on: true },
        { label: 'Saída acima de R$ 500',      desc: 'Alerta imediato no celular', on: true },
        { label: 'Relatório mensal',           desc: 'Email todo dia 1º com o consolidado do mês', on: false },
      ]
    },
  ];
  return (
    <Section title="Notificações" description="Escolha quais alertas você deseja receber e por onde.">
      {groups.map(g => (
        <div key={g.title} className="lv-notif-group">
          <h3 className="lv-notif-group__title">{g.title}</h3>
          {g.items.map(it => (
            <Toggle key={it.label} label={it.label} description={it.desc} defaultOn={it.on} />
          ))}
        </div>
      ))}
    </Section>
  );
}

function IntegrationsSection() {
  const integrations = [
    { name: 'WhatsApp Business', desc: 'Notificar clientes quando o carro estiver pronto.', connected: true },
    { name: 'Nota fiscal eletrônica', desc: 'Emissão automática de NFC-e para cada serviço.', connected: false },
    { name: 'Mercado Pago Point',     desc: 'Integração com maquininha física para registrar pagamentos.', connected: true },
    { name: 'Google Calendar',        desc: 'Sincronizar agendamentos com a agenda da equipe.', connected: false },
  ];
  return (
    <Section title="Integrações" description="Conecte o Lavare a outras ferramentas que você já usa.">
      <div className="lv-integ-list">
        {integrations.map(i => (
          <div key={i.name} className="lv-integ-row">
            <div className="lv-integ-row__icon"><Icon name="plug" size={20} style={{ color: 'var(--slate-500)' }} /></div>
            <div className="lv-cell-stack" style={{ flex: 1 }}>
              <span style={{ fontWeight: 500 }}>{i.name}</span>
              <span className="lv-cell-stack__sub">{i.desc}</span>
            </div>
            {i.connected
              ? <button className="lv-btn lv-btn--secondary lv-btn--sm"><Icon name="check" size={14} stroke={2.5} /> Conectado</button>
              : <button className="lv-btn lv-btn--primary lv-btn--sm">Conectar</button>}
          </div>
        ))}
      </div>
    </Section>
  );
}

const { useState: useToggleState } = React;
function Toggle({ label, description, defaultOn, fee }) {
  const [on, setOn] = useToggleState(defaultOn);
  return (
    <div className="lv-toggle-row">
      <div className="lv-cell-stack" style={{ flex: 1 }}>
        <span style={{ fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {label}
          {fee && <span className="lv-fee tabular">taxa {fee}</span>}
        </span>
        {description && <span className="lv-cell-stack__sub">{description}</span>}
      </div>
      <button type="button" role="switch" aria-checked={on} className={`lv-switch ${on ? 'is-on' : ''}`} onClick={() => setOn(o => !o)}>
        <span className="lv-switch__thumb"></span>
      </button>
    </div>
  );
}

window.SettingsSections = {
  perfil: ProfileSection,
  empresa: BusinessSection,
  usuarios: UsersSection,
  pagamentos: PaymentsSection,
  notificacoes: NotificationsSection,
  integracoes: IntegrationsSection,
};
