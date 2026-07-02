/* global React */
const { useMemo } = React;

function CashflowChart({ data }) {
  // data: [{ day: 'Seg', entrada: 1200, saida: 300 }, ...]
  const W = 720, H = 220, P = { l: 36, r: 16, t: 16, b: 28 };
  const max = useMemo(() => Math.max(...data.map(d => d.entrada)) * 1.15, [data]);
  const innerW = W - P.l - P.r;
  const innerH = H - P.t - P.b;
  const xStep = innerW / (data.length - 1);

  const pts = data.map((d, i) => ({
    x: P.l + i * xStep,
    yE: P.t + innerH - (d.entrada / max) * innerH,
    yS: P.t + innerH - (d.saida / max) * innerH,
  }));

  const pathE = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.yE}`).join(' ');
  const fillE = `${pathE} L ${pts[pts.length-1].x} ${P.t + innerH} L ${pts[0].x} ${P.t + innerH} Z`;
  const pathS = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.yS}`).join(' ');

  // y-axis ticks (4)
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(t => ({
    y: P.t + innerH - t * innerH,
    label: 'R$ ' + Math.round(t * max).toLocaleString('pt-BR'),
  }));

  return (
    <div className="lv-chart-card">
      <div className="lv-chart-card__head">
        <div>
          <h2 className="h2">Fluxo de caixa</h2>
          <p className="lv-card__sub">Últimos 7 dias</p>
        </div>
        <div className="lv-legend">
          <span className="lv-legend__item"><span className="lv-dot" style={{ background: 'var(--brand-500)' }}></span>Entradas</span>
          <span className="lv-legend__item"><span className="lv-dot" style={{ background: 'var(--slate-400)' }}></span>Saídas</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#0EA5E9" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={P.l} x2={W - P.r} y1={t.y} y2={t.y} stroke="#F1F5F9" strokeDasharray="0" />
            <text x={P.l - 8} y={t.y + 4} textAnchor="end" fontSize="10" fill="#94A3B8" fontFamily="JetBrains Mono">{t.label}</text>
          </g>
        ))}
        <path d={fillE} fill="url(#areaFill)" />
        <path d={pathE} stroke="#0EA5E9" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={pathS} stroke="#94A3B8" strokeWidth="1.5" fill="none" strokeDasharray="4 4" strokeLinecap="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.yE} r="3.5" fill="#fff" stroke="#0EA5E9" strokeWidth="2" />
        ))}
        {data.map((d, i) => (
          <text key={i} x={P.l + i * xStep} y={H - 8} textAnchor="middle" fontSize="11" fill="#64748B">{d.day}</text>
        ))}
      </svg>
    </div>
  );
}

window.CashflowChart = CashflowChart;
