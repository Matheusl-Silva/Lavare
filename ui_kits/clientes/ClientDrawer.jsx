/* global React, Icon, avatarColor, initials */
const { useState: useClientDrawerState } = React;

function ClientDrawer({ open, client, onClose }) {
  const [tab, setTab] = useClientDrawerState('historico');
  if (!open || !client) return null;

  return (
    <>
      <div className="lv-overlay" onClick={onClose} />
      <aside className="lv-drawer lv-drawer--wide">
        <div className="lv-drawer__head">
          <div className="lv-client-header">
            <div className="lv-avatar lv-avatar--lg" style={{ background: avatarColor(client.name) }}>{initials(client.name)}</div>
            <div>
              <div className="lv-client-header__name">
                {client.name}
                {client.tier === 'VIP' && <span className="lv-badge-vip">VIP</span>}
              </div>
              <div className="lv-client-header__sub">
                <span className="tabular">{client.phone}</span>
                <span className="lv-dot-sep">·</span>
                <span>{client.email || 'Sem email cadastrado'}</span>
              </div>
            </div>
          </div>
          <button className="lv-icon-btn" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>

        <div className="lv-tabs">
          <button className={`lv-tab ${tab === 'historico' ? 'is-active' : ''}`} onClick={() => setTab('historico')}>Histórico</button>
          <button className={`lv-tab ${tab === 'veiculos' ? 'is-active' : ''}`} onClick={() => setTab('veiculos')}>Veículos</button>
          <button className={`lv-tab ${tab === 'perfil' ? 'is-active' : ''}`} onClick={() => setTab('perfil')}>Perfil</button>
        </div>

        <div className="lv-drawer__body">
          {tab === 'historico' && (
            <>
              <div className="lv-stat-row">
                <div className="lv-mini-stat"><span>Total gasto</span><strong className="tabular">R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></div>
                <div className="lv-mini-stat"><span>Serviços</span><strong className="tabular">{client.history.length}</strong></div>
                <div className="lv-mini-stat"><span>Ticket médio</span><strong className="tabular">R$ {(client.totalSpent / Math.max(1, client.history.length)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></div>
              </div>
              <div className="lv-timeline">
                {client.history.map((h, i) => (
                  <div key={i} className="lv-timeline__item">
                    <div className="lv-timeline__dot"></div>
                    <div className="lv-timeline__body">
                      <div className="lv-timeline__row">
                        <strong>{h.service}</strong>
                        <span className="tabular">R$ {h.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="lv-timeline__meta">
                        <span className="tabular">{h.date}</span>
                        <span className="lv-dot-sep">·</span>
                        <span className="tabular">{h.plate}</span>
                        <span className="lv-dot-sep">·</span>
                        <span>{h.method}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'veiculos' && (
            <div className="lv-vehicle-list">
              {client.vehicles.map((v, i) => (
                <div key={i} className="lv-vehicle">
                  <Icon name="car" size={20} style={{ color: 'var(--slate-500)' }} />
                  <div className="lv-vehicle__info">
                    <span className="lv-plate tabular">{v.plate}</span>
                    <div>
                      <div style={{ fontWeight: 500 }}>{v.model}</div>
                      <div className="lv-cell-stack__sub">{v.color} · cadastrado em {v.since}</div>
                    </div>
                  </div>
                  <button className="lv-icon-btn lv-icon-btn--sm"><Icon name="more-horizontal" size={16} /></button>
                </div>
              ))}
            </div>
          )}

          {tab === 'perfil' && (
            <>
              <div className="lv-field"><label>Nome completo</label><input className="lv-input" defaultValue={client.name} /></div>
              <div className="lv-field-row">
                <div className="lv-field"><label>Telefone</label><input className="lv-input tabular" defaultValue={client.phone} /></div>
                <div className="lv-field"><label>Email</label><input className="lv-input" defaultValue={client.email || ''} placeholder="opcional" /></div>
              </div>
              <div className="lv-field"><label>Observações</label><textarea className="lv-input" rows="4" defaultValue={client.notes || ''} placeholder="Notas sobre preferências ou histórico do cliente"></textarea></div>
            </>
          )}
        </div>

        <div className="lv-drawer__foot">
          <button className="lv-btn lv-btn--ghost" onClick={onClose}>Fechar</button>
          <button className="lv-btn lv-btn--primary"><Icon name="plus" size={14} stroke={2} /> Novo serviço</button>
        </div>
      </aside>
    </>
  );
}

window.ClientDrawer = ClientDrawer;
