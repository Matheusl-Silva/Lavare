/* global React, Icon */

function avatarColor(name) {
  // deterministic hash → palette
  const palette = ['#0EA5E9', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#0284C7', '#059669'];
  const i = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  return palette[i];
}
function initials(name) {
  return name.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

function ClientsTable({ rows, onOpen, filter, onFilter, query, onQuery }) {
  return (
    <div className="lv-table-card">
      <div className="lv-table-card__head">
        <div>
          <h2 className="h2">Clientes</h2>
          <p className="lv-card__sub">{rows.length} clientes no filtro atual</p>
        </div>
        <div className="lv-table-card__tools">
          <div className="lv-segmented">
            {['Todos', 'VIP', 'Inativos'].map(f => (
              <button key={f} className={f === filter ? 'is-active' : ''} onClick={() => onFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="lv-search-inline">
            <Icon name="search" size={14} />
            <input value={query} onChange={e => onQuery(e.target.value)} placeholder="Buscar…" />
          </div>
        </div>
      </div>
      <div className="lv-table-wrap">
        <table className="lv-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Telefone</th>
              <th>Veículos</th>
              <th>Última visita</th>
              <th style={{ textAlign: 'right' }}>Total gasto</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan="6" className="lv-empty">Nenhum cliente encontrado.</td></tr>}
            {rows.map(c => (
              <tr key={c.id} onClick={() => onOpen(c)} style={{ cursor: 'pointer' }}>
                <td>
                  <div className="lv-client-cell">
                    <div className="lv-avatar lv-avatar--md" style={{ background: avatarColor(c.name) }}>{initials(c.name)}</div>
                    <div className="lv-cell-stack">
                      <span style={{ fontWeight: 500 }}>{c.name}</span>
                      <span className="lv-cell-stack__sub">{c.email || '—'}</span>
                    </div>
                    {c.tier === 'VIP' && <span className="lv-badge-vip">VIP</span>}
                  </div>
                </td>
                <td className="tabular">{c.phone}</td>
                <td>
                  <div className="lv-plate-stack">
                    {c.plates.slice(0, 2).map(p => <span key={p} className="lv-plate lv-plate--sm tabular">{p}</span>)}
                    {c.plates.length > 2 && <span className="lv-cell-stack__sub">+{c.plates.length - 2}</span>}
                  </div>
                </td>
                <td>
                  <div className="lv-cell-stack">
                    <span>{c.lastVisit}</span>
                    <span className="lv-cell-stack__sub">{c.lastService}</span>
                  </div>
                </td>
                <td className="tabular" style={{ textAlign: 'right', fontWeight: 500 }}>R$ {c.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td><Icon name="chevron-right" size={16} style={{ color: 'var(--fg-subtle)' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

window.ClientsTable = ClientsTable;
window.avatarColor = avatarColor;
window.initials = initials;
