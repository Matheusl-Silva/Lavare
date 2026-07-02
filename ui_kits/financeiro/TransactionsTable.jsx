/* global React, Icon */
const { useState: useTxState } = React;

function MethodBadge({ method }) {
  const map = {
    'Pix':       { bg: 'var(--brand-50)',    fg: 'var(--brand-700)' },
    'Dinheiro':  { bg: 'var(--success-50)',  fg: 'var(--success-700)' },
    'Cartão':    { bg: 'var(--slate-100)',   fg: 'var(--slate-700)' },
    'Débito':    { bg: 'var(--slate-100)',   fg: 'var(--slate-700)' },
  };
  const c = map[method] || map['Cartão'];
  return <span className="lv-method-badge" style={{ background: c.bg, color: c.fg }}>{method}</span>;
}

function TransactionsTable({ rows, filter, onFilter, onAdd }) {
  const filters = ['Todas', 'Entradas', 'Saídas'];
  return (
    <div className="lv-table-card">
      <div className="lv-table-card__head">
        <div>
          <h2 className="h2">Movimentações</h2>
          <p className="lv-card__sub">{rows.length} registros no período</p>
        </div>
        <div className="lv-table-card__tools">
          <div className="lv-segmented">
            {filters.map(f => (
              <button key={f} className={f === filter ? 'is-active' : ''} onClick={() => onFilter(f)}>{f}</button>
            ))}
          </div>
          <button className="lv-btn lv-btn--ghost"><Icon name="filter" size={16} /> Filtros</button>
          <button className="lv-btn lv-btn--ghost"><Icon name="download" size={16} /> Exportar</button>
        </div>
      </div>
      <div className="lv-table-wrap">
        <table className="lv-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Forma de pagamento</th>
              <th style={{ textAlign: 'right' }}>Valor</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan="6" className="lv-empty">Nenhuma movimentação encontrada no período.</td></tr>
            )}
            {rows.map(r => (
              <tr key={r.id}>
                <td className="tabular">{r.date}</td>
                <td>
                  <div className="lv-cell-stack">
                    <span>{r.description}</span>
                    {r.plate && <span className="lv-cell-stack__sub tabular">{r.plate}</span>}
                  </div>
                </td>
                <td><span className="lv-cat-pill">{r.category}</span></td>
                <td><MethodBadge method={r.method} /></td>
                <td className={`tabular lv-amount ${r.type === 'in' ? 'is-in' : 'is-out'}`}>
                  {r.type === 'in' ? '+ ' : '− '}R$ {r.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td><button className="lv-icon-btn lv-icon-btn--sm"><Icon name="more-horizontal" size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

window.TransactionsTable = TransactionsTable;
