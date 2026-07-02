/* global React */
function KpiRow({ items }) {
  return (
    <div className="lv-kpi-row">
      {items.map(k => (
        <div key={k.label} className="lv-kpi">
          <div className="lv-kpi__label">{k.label}</div>
          <div className="lv-kpi__value">{k.value}</div>
          {k.delta && (
            <div className={`lv-kpi__delta ${k.delta.startsWith('-') ? 'is-down' : 'is-up'}`}>
              {k.delta.startsWith('-') ? '↓' : '↑'} {k.delta.replace(/^[-+]/, '')} <span className="lv-kpi__delta-period">vs. {k.period || 'ontem'}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

window.KpiRow = KpiRow;
