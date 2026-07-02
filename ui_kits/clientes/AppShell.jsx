/* global React */
function Icon({ name, size = 20, stroke = 1.75, style = {} }) {
  return <i data-lucide={name} style={{ width: size, height: size, strokeWidth: stroke, ...style }} />;
}

function Sidebar({ active }) {
  const nav = [
    { id: 'agenda', label: 'Agenda', icon: 'calendar' },
    { id: 'estoque-carros', label: 'Fila de carros', icon: 'car' },
    { id: 'pdv', label: 'PDV', icon: 'shopping-cart' },
    { id: 'caixa', label: 'Caixa', icon: 'banknote' },
    { id: 'financeiro', label: 'Financeiro', icon: 'wallet' },
    { id: 'estoque-itens', label: 'Estoque de itens', icon: 'package' },
    { id: 'clientes', label: 'Clientes', icon: 'users' },
    { id: 'relatorios', label: 'Relatórios', icon: 'bar-chart-3' },
  ];
  return (
    <aside className="lv-sidebar">
      <div className="lv-sidebar__brand"><img src="../../assets/logo.svg" alt="Lavare" height="28" /></div>
      <nav className="lv-sidebar__nav">
        {nav.map(item => (
          <a key={item.id} className={`lv-nav-item ${item.id === active ? 'is-active' : ''}`} href="#">
            <Icon name={item.icon} size={18} /><span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="lv-sidebar__footer">
        <a className="lv-nav-item" href="#"><Icon name="settings" size={18} /><span>Configurações</span></a>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="lv-header">
      <div className="lv-header__search">
        <Icon name="search" size={16} />
        <input placeholder="Buscar cliente, telefone, placa…" />
        <kbd>⌘K</kbd>
      </div>
      <div className="lv-header__right">
        <button className="lv-icon-btn"><Icon name="bell" size={18} /></button>
        <div className="lv-avatar">RM</div>
      </div>
    </header>
  );
}

function PageTitle({ title, subtitle, children }) {
  return (
    <div className="lv-page-title">
      <div>
        <h1 className="display">{title}</h1>
        {subtitle && <p className="lv-page-title__sub">{subtitle}</p>}
      </div>
      {children && <div className="lv-page-title__actions">{children}</div>}
    </div>
  );
}

function AppShell({ active, children }) {
  return (
    <div className="lv-app">
      <Sidebar active={active} />
      <div className="lv-main"><Header /><div className="lv-content">{children}</div></div>
    </div>
  );
}
window.AppShell = AppShell; window.PageTitle = PageTitle; window.Icon = Icon;
