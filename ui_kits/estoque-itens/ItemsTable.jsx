/* global React, Icon */
const { useState: useMenuState, useEffect: useMenuEffect, useRef: useMenuRef, useCallback: useMenuCb } = React;

function RowMenu({ item, onMove, onDelete }) {
  const [open, setOpen] = useMenuState(false);
  const [pos, setPos] = useMenuState({ top: 0, left: 0 });
  const ref = useMenuRef(null);
  const btnRef = useMenuRef(null);

  const updatePos = useMenuCb(() => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: rect.right - 200 });
    }
  }, []);

  useMenuEffect(() => {
    if (!open) return;
    updatePos();
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target) && !btnRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="lv-row-menu">
      <button ref={btnRef} className="lv-icon-btn lv-icon-btn--sm" onClick={() => setOpen(o => !o)}>
        <Icon name="more-horizontal" size={16} />
      </button>
      {open && (
        <div className="lv-dropdown" ref={ref} style={{ top: pos.top, left: pos.left }}>
          <button className="lv-dropdown__item" onClick={() => { onMove(item); setOpen(false); }}>
            <Icon name="arrow-left-right" size={14} /> Movimentar estoque
          </button>
          <div className="lv-dropdown__sep"></div>
          <button className="lv-dropdown__item lv-dropdown__item--danger" onClick={() => { onDelete(item); setOpen(false); }}>
            <Icon name="trash-2" size={14} /> Excluir item
          </button>
        </div>
      )}
    </div>
  );
}

function StockBar({ qty, min, max }) {
  const pct = Math.min(100, (qty / max) * 100);
  const minPct = (min / max) * 100;
  let color = 'var(--success-500)';
  if (qty <= min) color = 'var(--warning-500)';
  if (qty <= min * 0.5) color = 'var(--danger-500)';

  return (
    <div className="lv-stockbar">
      <div className="lv-stockbar__track">
        <div className="lv-stockbar__fill" style={{ width: pct + '%', background: color }} />
        <div className="lv-stockbar__min" style={{ left: minPct + '%' }} title={`Mínimo: ${min}`} />
      </div>
      <div className="lv-stockbar__meta tabular">
        <span style={{ color }}>{qty}</span>
        <span className="lv-stockbar__sep">/ {max}</span>
      </div>
    </div>
  );
}

function StatusForQty(qty, min) {
  if (qty <= min * 0.5) return { label: 'Estoque crítico', cls: 'lv-status--ready', style: { background: 'var(--danger-50)', color: 'var(--danger-700)' }, dot: 'var(--danger-500)' };
  if (qty <= min)       return { label: 'Estoque baixo',   cls: '', style: { background: 'var(--warning-50)', color: 'var(--warning-700)' }, dot: 'var(--warning-500)' };
  return                       { label: 'Em estoque',      cls: '', style: { background: 'var(--success-50)', color: 'var(--success-700)' }, dot: 'var(--success-500)' };
}

function ItemsTable({ rows, onMove, onDelete }) {
  return (
    <div className="lv-table-card">
      <div className="lv-table-card__head">
        <div>
          <h2 className="h2">Itens em estoque</h2>
          <p className="lv-card__sub">{rows.length} produtos cadastrados</p>
        </div>
        <div className="lv-table-card__tools">
          <button className="lv-btn lv-btn--ghost"><Icon name="filter" size={16} /> Filtros</button>
          <button className="lv-btn lv-btn--ghost"><Icon name="download" size={16} /> Exportar</button>
        </div>
      </div>
      <div className="lv-table-wrap">
        <table className="lv-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Categoria</th>
              <th>Estoque</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Valor unitário</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan="6" className="lv-empty">Nenhum item nesta categoria.</td></tr>
            )}
            {rows.map(r => {
              const st = StatusForQty(r.qty, r.min);
              return (
                <tr key={r.id}>
                  <td>
                    <div className="lv-cell-stack">
                      <span style={{ fontWeight: 500 }}>{r.name}</span>
                      <span className="lv-cell-stack__sub tabular">SKU {r.sku}</span>
                    </div>
                  </td>
                  <td><span className="lv-cat-pill">{r.category}</span></td>
                  <td><StockBar qty={r.qty} min={r.min} max={r.max} /></td>
                  <td><span className="lv-status" style={st.style}><span className="lv-dot" style={{ background: st.dot }}></span>{st.label}</span></td>
                  <td className="tabular" style={{ textAlign: 'right' }}>R$ {r.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <RowMenu item={r} onMove={onMove} onDelete={onDelete} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

window.ItemsTable = ItemsTable;
