/* global React, Icon */
const { useState: useCloseState } = React;

function CloseCaixaModal({ open, onClose, expected, onConfirm }) {
  const [counted, setCounted] = useCloseState('');
  if (!open) return null;
  const fmt = v => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const countedNum = parseFloat((counted || '0').replace(/\./g, '').replace(',', '.')) || 0;
  const diff = countedNum - expected;

  return (
    <>
      <div className="lv-overlay" onClick={onClose} />
      <div className="lv-modal lv-modal--sm">
        <div className="lv-modal__head"><h2 className="h2">Fechar caixa</h2></div>
        <div className="lv-modal__body">
          <p className="small" style={{ margin: 0 }}>Confira o dinheiro em espécie na gaveta e informe o valor contado para conferência.</p>
          <div className="lv-cart-summary">
            <div className="lv-cart-summary__row"><span>Saldo esperado em espécie</span><span className="tabular">{fmt(expected)}</span></div>
          </div>
          <div className="lv-field">
            <label>Valor contado na gaveta</label>
            <div className="lv-input-prefix">
              <span>R$</span>
              <input className="lv-input" value={counted} onChange={e => setCounted(e.target.value)} placeholder="0,00" autoFocus />
            </div>
          </div>
          {counted !== '' && (
            <div className={`lv-alert ${diff === 0 ? 'lv-alert--info' : (diff > 0 ? 'lv-alert--info' : 'lv-alert--warning')}`}>
              <Icon name={diff === 0 ? 'check-circle-2' : 'alert-triangle'} size={16} />
              <span>{diff === 0 ? 'Caixa confere exatamente.' : (diff > 0 ? `Sobra de ${fmt(diff)} em relação ao esperado.` : `Falta de ${fmt(Math.abs(diff))} em relação ao esperado.`)}</span>
            </div>
          )}
        </div>
        <div className="lv-modal__foot">
          <button className="lv-btn lv-btn--ghost" onClick={onClose}>Cancelar</button>
          <button className="lv-btn lv-btn--primary" onClick={() => { onConfirm(); onClose(); }} disabled={counted === ''}>Fechar caixa</button>
        </div>
      </div>
    </>
  );
}

window.CloseCaixaModal = CloseCaixaModal;
