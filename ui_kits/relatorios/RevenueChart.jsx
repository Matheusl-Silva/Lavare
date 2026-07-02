/* global React */
function RevenueChart({ data }) {
  const W = 760, H = 260, P = { l: 44, r: 16, t: 16, b: 32 };
  const max = Math.max(...data.map(d => d.value)) * 1.15;
  const innerW = W - P.l - P.r;
  const innerH = H - P.t - P.b;
  const bw = (innerW / data.length) * 0.55;
  const gap = (innerW / data.length) - bw;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(t => ({
    y: P.t + innerH - t * innerH,
    label: 'R$ ' + (t * max).toLocaleString('pt-BR', { maximumFractionDigits: 0 }),
  }));
  return (
    <div className="lv-chart-card">
      <div className="lv-chart-card__head">
        <div>
          <h2 className="h2">Receita por mês</h2>
          <p className="lv-card__sub">Últimos 12 meses</p>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="barFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={P.l} x2={W - P.r} y1={t.y} y2={t.y} stroke="#F1F5F9" />
            <text x={P.l - 8} y={t.y + 4} textAnchor="end" fontSize="10" fill="#94A3B8" fontFamily="JetBrains Mono">{t.label}</text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = P.l + i * (bw + gap) + gap / 2;
          const h = (d.value / max) * innerH;
          const y = P.t + innerH - h;
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={bw} height={h} rx="3" fill="url(#barFill)" />
              <text x={x + bw / 2} y={H - 12} textAnchor="middle" fontSize="11" fill="#64748B">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
window.RevenueChart = RevenueChart;
