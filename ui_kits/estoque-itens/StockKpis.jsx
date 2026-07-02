/* global React */
function StockKpis({ items }) {
  return (
    <div className="lv-kpi-row">
      {items.map(k => (
        <div key={k.label} className="lv-kpi">
          <div className="lv-kpi__label">{k.label}</div>
          <div className="lv-kpi__value" style={{ color: k.color || 'var(--fg-default)' }}>{k.value}</div>
          {k.sub && <div className="lv-kpi__delta" style={{ color: 'var(--fg-muted)' }}>{k.sub}</div>}
        </div>
      ))}
    </div>
  );
}
window.StockKpis = StockKpis;
