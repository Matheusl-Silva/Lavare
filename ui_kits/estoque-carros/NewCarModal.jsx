/* global React, Icon */
const { useState: useCarModalState } = React;

function NewCarModal({ open, onClose, onSave }) {
  const [plate, setPlate] = useCarModalState('');
  const [model, setModel] = useCarModalState('');
  const [customer, setCustomer] = useCarModalState('');
  const [phone, setPhone] = useCarModalState('');
  const [service, setService] = useCarModalState('Lavagem simples');
  const [price, setPrice] = useCarModalState('60,00');

  if (!open) return null;

  const services = {
    'Lavagem simples':   '60,00',
    'Lavagem completa':  '120,00',
    'Lavagem + cera':    '180,00',
    'Polimento técnico': '280,00',
    'Higienização interna': '180,00',
  };

  const setServiceAndPrice = (s) => { setService(s); setPrice(services[s] || ''); };
  const plateValid = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(plate);

  const handleSave = () => {
    if (!plateValid || !model || !customer) return;
    onSave({
      id: 'car-' + Date.now(),
      plate, model, customer, phone,
      service, price: parseFloat(price.replace(',', '.')),
      status: 'wait', duration: '0min', startedAt: Date.now(),
    });
    setPlate(''); setModel(''); setCustomer(''); setPhone('');
    onClose();
  };

  return (
    <>
      <div className="lv-overlay" onClick={onClose} />
      <div className="lv-modal">
        <div className="lv-modal__head">
          <h2 className="h2">Novo carro na fila</h2>
          <p className="lv-card__sub">Cadastre o veículo para iniciar o atendimento</p>
        </div>
        <div className="lv-modal__body">
          <div className="lv-field-row">
            <div className="lv-field">
              <label>Placa</label>
              <input className="lv-input tabular" value={plate}
                onChange={e => setPlate(e.target.value.toUpperCase())}
                placeholder="ABC1D23" maxLength={7}
                style={!plate || plateValid ? {} : { borderColor: 'var(--danger-500)' }} />
              {plate && !plateValid && <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--danger-700)' }}>Formato inválido. Use ABC1D23.</span>}
            </div>
            <div className="lv-field">
              <label>Modelo</label>
              <input className="lv-input" value={model} onChange={e => setModel(e.target.value)} placeholder="Ex.: Honda Civic prata" />
            </div>
          </div>
          <div className="lv-field-row">
            <div className="lv-field">
              <label>Cliente</label>
              <input className="lv-input" value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Nome completo" />
            </div>
            <div className="lv-field">
              <label>Telefone <span className="lv-field__optional">(opcional)</span></label>
              <input className="lv-input tabular" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(11) 99999-0000" />
            </div>
          </div>
          <div className="lv-field">
            <label>Serviço</label>
            <select className="lv-input" value={service} onChange={e => setServiceAndPrice(e.target.value)}>
              {Object.keys(services).map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="lv-field">
            <label>Valor</label>
            <div className="lv-input-prefix">
              <span>R$</span>
              <input className="lv-input tabular" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="lv-modal__foot">
          <button className="lv-btn lv-btn--ghost" onClick={onClose}>Cancelar</button>
          <button className="lv-btn lv-btn--primary" onClick={handleSave}
            disabled={!plateValid || !model || !customer}>
            Adicionar à fila
          </button>
        </div>
      </div>
    </>
  );
}

window.NewCarModal = NewCarModal;
