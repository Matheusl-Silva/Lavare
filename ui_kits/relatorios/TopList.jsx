/* global React */
function TopList({ title, subtitle, items, valueFmt }) {
  const max = Math.max(...items.map(i => i.value));
  return (
    <div className="lv-chart-card lv-chart-card--compact">
      <div className="lv-chart-card__head">
        <div>
          <h2 className="h2">{title}</h2>
          {subtitle && <p className="lv-card__sub">{subtitle}</p>}
        </div>
      </div>
      <div className="lv-toplist">
        {items.map((it, i) => (
          <div key={i} className="lv-toplist__row">
            <span className="lv-toplist__rank">{(i + 1).toString().padStart(2, '0')}</span>
            <div className="lv-toplist__main">
              <div className="lv-toplist__label">{it.label}</div>
              <div className="lv-toplist__bar"><div className="lv-toplist__fill" style={{ width: (it.value / max) * 100 + '%' }} /></div>
            </div>
            <span className="lv-toplist__value tabular">{valueFmt ? valueFmt(it.value) : it.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
window.TopList = TopList;
