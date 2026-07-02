/* global React, Icon */
const { useState: useItemDrawerState } = React;

function ItemDrawer({ open, mode, item, onClose, onSave }) {
  const [tab, setTab] = useItemDrawerState(mode || 'new');
  const [name, setName] = useItemDrawerState('');
  const [category, setCategory] = useItemDrawerState('Higienização');
  const [qty, setQty] = useItemDrawerState('');
  const [price, setPrice] = useItemDrawerState('');
  const [movType, setMovType] = useItemDrawerState('in');
  const [movQty, setMovQty] = useItemDrawerState('');

  React.useEffect(() => { setTab(mode || 'new'); }, [mode, open]);

  if (!open) return null;
  const isMove = tab === 'move';

  const handleSave = () => {
    if (isMove) {
      if (!movQty) return;
      onSave({ kind: 'move', item, type: movType, qty: parseInt(movQty, 10) });
      setMovQty('');
    } else {
      if (!name || !qty || !price) return;
      onSave({
        kind: 'new',
        item: {
          id: 'it-' + Date.now(),
          name, category,
          sku: Math.random().toString(36).slice(2, 8).toUpperCase(),
          qty: parseInt(qty, 10), min: 5, max: parseInt(qty, 10) * 2,
          price: parseFloat(price.replace(',', '.')),
        },
      });
      setName(''); setQty(''); setPrice('');
    }
    onClose();
  };

  return (
    <>
      <div className="lv-overlay" onClick={onClose} />
      <aside className="lv-drawer">
        <div className="lv-drawer__head">
          <h2 className="h2">{isMove ? `Movimentar — ${item?.name}` : 'Novo item'}</h2>
          <button className="lv-icon-btn" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>

        <div className="lv-drawer__body">
          {!item && (
            <div className="lv-segmented lv-segmented--block">
              <button className={tab === 'new' ? 'is-active' : ''} onClick={() => setTab('new')}>Cadastrar item</button>
              <button className={tab === 'move' ? 'is-active' : ''} disabled style={{ opacity: 0.5 }}>Movimentar</button>
            </div>
          )}

          {isMove ? (
            <>
              <div className="lv-segmented lv-segmented--block">
                <button className={movType === 'in'  ? 'is-active' : ''} onClick={() => setMovType('in')}>Entrada</button>
                <button className={movType === 'out' ? 'is-active' : ''} onClick={() => setMovType('out')}>Saída</button>
              </div>
              <div className="lv-field">
                <label>Quantidade</label>
                <input className="lv-input tabular" value={movQty} onChange={e => setMovQty(e.target.value)} placeholder="0" />
              </div>
              <div className="lv-field">
                <label>Motivo <span className="lv-field__optional">(opcional)</span></label>
                <textarea className="lv-input" rows="3" placeholder="Ex.: Compra mensal de insumos, perda, uso em serviço…" />
              </div>
              <div className="lv-info-card">
                <Icon name="info" size={16} />
                <div>
                  <div><strong>Estoque atual:</strong> {item?.qty} {item?.unit || 'un'}</div>
                  <div>Após a movimentação: <strong className="tabular">{(item?.qty || 0) + (movType === 'in' ? 1 : -1) * (parseInt(movQty, 10) || 0)} {item?.unit || 'un'}</strong></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="lv-field">
                <label>Nome do produto</label>
                <input className="lv-input" value={name} onChange={e => setName(e.target.value)} placeholder="Ex.: Shampoo automotivo 5L" />
              </div>
              <div className="lv-field-row">
                <div className="lv-field">
                  <label>Categoria</label>
                  <select className="lv-input" value={category} onChange={e => setCategory(e.target.value)}>
                    <option>Higienização</option><option>Cera</option><option>Polimento</option>
                    <option>Descartáveis</option><option>Equipamentos</option><option>Outros</option>
                  </select>
                </div>
                <div className="lv-field">
                  <label>Quantidade inicial</label>
                  <input className="lv-input tabular" value={qty} onChange={e => setQty(e.target.value)} placeholder="0" />
                </div>
              </div>
              <div className="lv-field-row">
                <div className="lv-field">
                  <label>Estoque mínimo</label>
                  <input className="lv-input tabular" defaultValue="5" />
                </div>
                <div className="lv-field">
                  <label>Valor unitário</label>
                  <div className="lv-input-prefix">
                    <span>R$</span>
                    <input className="lv-input" value={price} onChange={e => setPrice(e.target.value)} placeholder="0,00" />
                  </div>
                </div>
              </div>
              <div className="lv-field">
                <label>Fornecedor <span className="lv-field__optional">(opcional)</span></label>
                <input className="lv-input" placeholder="Ex.: Distribuidora Auto Clean" />
              </div>
            </>
          )}
        </div>

        <div className="lv-drawer__foot">
          <button className="lv-btn lv-btn--ghost" onClick={onClose}>Cancelar</button>
          <button className="lv-btn lv-btn--primary" onClick={handleSave}
            disabled={isMove ? !movQty : (!name || !qty || !price)}>
            {isMove ? 'Confirmar movimentação' : 'Cadastrar item'}
          </button>
        </div>
      </aside>
    </>
  );
}

window.ItemDrawer = ItemDrawer;
