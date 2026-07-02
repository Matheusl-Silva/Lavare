/* global React, Icon */

function MethodBreakdown({ methods }) {
  const fmt = v => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const total = methods.reduce((s, m) => s + m.value, 0);
  return (
    <div className="lv-panel">
      <div className="lv-panel__head"><h2 className="h3">Recebido por método</h2></div>
      <div className="lv-panel__body">
        {methods.map(m => (
          <div key={m.label} className="lv-method-row">
            <div className="lv-method-row__icon"><Icon name={m.icon} size={18} /></div>
            <div className="lv-method-row__main">
              <div className="lv-method-row__label">{m.label}</div>
              <div className="lv-method-row__count">{m.count} {m.count === 1 ? 'operação' : 'operações'}</div>
            </div>
            <div className="lv-method-row__value tabular">{fmt(m.value)}</div>
          </div>
        ))}
      </div>
      <div className="lv-caixa-total">
        <span className="lv-caixa-total__label">Total recebido</span>
        <span className="lv-caixa-total__value tabular">{fmt(total)}</span>
      </div>
    </div>
  );
}

function OperationsList({ ops }) {
  const fmt = v => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  return (
    <div className="lv-panel">
      <div className="lv-panel__head">
        <h2 className="h3">Operações de hoje</h2>
        <button className="lv-btn lv-btn--ghost lv-btn--sm"><Icon name="list-filter" size={14} /> Filtrar</button>
      </div>
      <div className="lv-panel__body">
        <div className="lv-op-list">
          {ops.map(op => (
            <div key={op.id} className="lv-op">
              <div className={`lv-op__icon lv-op__icon--${op.type}`}>
                <Icon name={op.type === 'in' ? 'arrow-down-left' : 'arrow-up-right'} size={18} />
              </div>
              <div className="lv-op__main">
                <div className="lv-op__desc">{op.desc}</div>
                <div className="lv-op__meta">
                  <span className="tabular">{op.time}</span>
                  <span>·</span>
                  <span>{op.method}</span>
                  {op.plate && (<><span>·</span><span className="tabular">{op.plate}</span></>)}
                </div>
              </div>
              <div className={`lv-op__amount is-${op.type} tabular`}>
                {op.type === 'in' ? '+' : '−'} {fmt(op.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.MethodBreakdown = MethodBreakdown;
window.OperationsList = OperationsList;
