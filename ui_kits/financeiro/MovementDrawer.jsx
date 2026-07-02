/* global React, Icon */
const { useState: useDrawerState } = React;

function MovementDrawer({ open, onClose, onSave }) {
  const [type, setType] = useDrawerState('in');
  const [desc, setDesc] = useDrawerState('');
  const [amount, setAmount] = useDrawerState('');
  const [method, setMethod] = useDrawerState('Pix');
  const [category, setCategory] = useDrawerState('Lavagem');
  const [plate, setPlate] = useDrawerState('');

  if (!open) return null;

  const handleSave = () => {
    if (!desc || !amount) return;
    onSave({
      id: 'tx-' + Date.now(),
      type, description: desc, method, category,
      amount: parseFloat(amount.replace(',', '.')),
      plate: plate || null,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' ' +
            new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });
    setDesc(''); setAmount(''); setPlate('');
    onClose();
  };

  return (
    <>
      <div className="lv-overlay" onClick={onClose} />
      <aside className="lv-drawer">
        <div className="lv-drawer__head">
          <h2 className="h2">Nova movimentação</h2>
          <button className="lv-icon-btn" onClick={onClose} aria-label="Fechar">
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="lv-drawer__body">
          <div className="lv-segmented lv-segmented--block">
            <button className={type === 'in' ? 'is-active' : ''} onClick={() => setType('in')}>Entrada</button>
            <button className={type === 'out' ? 'is-active' : ''} onClick={() => setType('out')}>Saída</button>
          </div>

          <div className="lv-field">
            <label>Descrição</label>
            <input className="lv-input" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Ex.: Lavagem completa" />
          </div>

          <div className="lv-field-row">
            <div className="lv-field">
              <label>Valor</label>
              <div className="lv-input-prefix">
                <span>R$</span>
                <input className="lv-input" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0,00" />
              </div>
            </div>
            <div className="lv-field">
              <label>Forma de pagamento</label>
              <select className="lv-input" value={method} onChange={e => setMethod(e.target.value)}>
                <option>Pix</option><option>Dinheiro</option><option>Cartão</option><option>Débito</option>
              </select>
            </div>
          </div>

          <div className="lv-field-row">
            <div className="lv-field">
              <label>Categoria</label>
              <select className="lv-input" value={category} onChange={e => setCategory(e.target.value)}>
                <option>Lavagem</option><option>Polimento</option><option>Estética</option>
                <option>Insumos</option><option>Salário</option><option>Outros</option>
              </select>
            </div>
            <div className="lv-field">
              <label>Placa do veículo <span className="lv-field__optional">(opcional)</span></label>
              <input className="lv-input tabular" value={plate} onChange={e => setPlate(e.target.value.toUpperCase())} placeholder="ABC1D23" maxLength={7} />
            </div>
          </div>

          <div className="lv-field">
            <label>Observação <span className="lv-field__optional">(opcional)</span></label>
            <textarea className="lv-input" rows="3" placeholder="Notas adicionais sobre esta movimentação"></textarea>
          </div>
        </div>

        <div className="lv-drawer__foot">
          <button className="lv-btn lv-btn--ghost" onClick={onClose}>Cancelar</button>
          <button className="lv-btn lv-btn--primary" onClick={handleSave} disabled={!desc || !amount}>Salvar movimentação</button>
        </div>
      </aside>
    </>
  );
}

window.MovementDrawer = MovementDrawer;
