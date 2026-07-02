/* global React */
function ServicesDonut({ data }) {
  // data: [{ label, value, color }]
  const total = data.reduce((s, d) => s + d.value, 0);
  const R = 80, r = 56, cx = 110, cy = 110;
  let acc = 0;
  const arcs = data.map((d) => {
    const startAngle = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.value;
    const endAngle = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = cx + R * Math.cos(startAngle);
    const y1 = cy + R * Math.sin(startAngle);
    const x2 = cx + R * Math.cos(endAngle);
    const y2 = cy + R * Math.sin(endAngle);
    const x3 = cx + r * Math.cos(endAngle);
    const y3 = cy + r * Math.sin(endAngle);
    const x4 = cx + r * Math.cos(startAngle);
    const y4 = cy + r * Math.sin(startAngle);
    return {
      d: `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${r} ${r} 0 ${large} 0 ${x4} ${y4} Z`,
      color: d.color, pct: (d.value / total) * 100, ...d
    };
  });

  return (
    <div className="lv-chart-card lv-chart-card--compact">
      <div className="lv-chart-card__head">
        <div>
          <h2 className="h2">Mix de serviços</h2>
          <p className="lv-card__sub">Distribuição por categoria</p>
        </div>
      </div>
      <div className="lv-donut-wrap">
        <svg viewBox="0 0 220 220" width="220" height="220">
          {arcs.map((a, i) => <path key={i} d={a.d} fill={a.color} />)}
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize="14" fill="#64748B" fontFamily="Inter">total</text>
          <text x={cx} y={cy + 16} textAnchor="middle" fontSize="22" fontWeight="600" fill="#0F172A" fontFamily="Inter" fontVariant="tabular-nums">{total}</text>
        </svg>
        <div className="lv-donut-legend">
          {arcs.map((a, i) => (
            <div key={i} className="lv-donut-legend__row">
              <span className="lv-donut-legend__dot" style={{ background: a.color }}></span>
              <span className="lv-donut-legend__label">{a.label}</span>
              <span className="lv-donut-legend__pct tabular">{a.pct.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
window.ServicesDonut = ServicesDonut;
