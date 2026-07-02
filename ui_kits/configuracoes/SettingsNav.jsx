/* global React, Icon */
function SettingsNav({ active, onChange }) {
  const items = [
    { id: 'perfil',        label: 'Perfil',                 icon: 'user' },
    { id: 'empresa',       label: 'Empresa',                icon: 'building-2' },
    { id: 'usuarios',      label: 'Usuários e permissões', icon: 'users' },
    { id: 'pagamentos',    label: 'Métodos de pagamento',  icon: 'credit-card' },
    { id: 'notificacoes',  label: 'Notificações',           icon: 'bell' },
    { id: 'integracoes',   label: 'Integrações',            icon: 'plug' },
  ];
  return (
    <nav className="lv-settings-nav">
      {items.map(it => (
        <button key={it.id} className={`lv-settings-nav__item ${it.id === active ? 'is-active' : ''}`} onClick={() => onChange(it.id)}>
          <Icon name={it.icon} size={16} />
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
window.SettingsNav = SettingsNav;
