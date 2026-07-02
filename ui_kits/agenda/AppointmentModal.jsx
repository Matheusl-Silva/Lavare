/* global React, Icon */
const { useState: useApptState } = React;

function AppointmentModal({ open, onClose, onSave }) {
  const [service, setService] = useApptState('Lavagem completa');
  const [plate, setPlate] = useApptState('');
  const [customer, setCustomer] = useApptState('');
  const [day, setDay] = useApptState('2');
  const [time, setTime] = useApptState('09:00');

  if (!open) return null;

  const handleSave = () => {
    if (!plate || !customer) return;
    onSave({ service, plate, customer, day: parseInt(day, 10), time });
    setPlate(''); setCustomer('');
    onClose();
  };

  return (
    <>
      <div className="lv-overlay" onClick={onClose} />
      <aside className="lv-drawer">
        <div className="lv-drawer__head">
          <h2 className="h2">Novo agendamento</h2>
          <button className="lv-icon-btn" onClick={onClose} aria-label="Fechar"><Icon name="x" size={18} /></button>
        </div>
        <div className="lv-drawer__body">
          <div className="lv-field">
            <label>Serviço</label>
            <select className="lv-input" value={service} onChange={e => setService(e.target.value)}>
              <option>Lavagem completa</option><option>Lavagem simples</option>
              <option>Polimento técnico</option><option>Higienização interna</option><option>Lavagem + cera</option>
            </select>
          </div>
          <div className="lv-field-row">
            <div className="lv-field">
              <label>Cliente</label>
              <input className="lv-input" value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Nome do cliente" />
            </div>
            <div className="lv-field">
              <label>Placa</label>
              <input className="lv-input tabular" value={plate} onChange={e => setPlate(e.target.value.toUpperCase())} placeholder="ABC1D23" maxLength={7} />
            </div>
          </div>
          <div className="lv-field-row">
            <div className="lv-field">
              <label>Dia</label>
              <select className="lv-input" value={day} onChange={e => setDay(e.target.value)}>
                <option value="0">Segunda</option><option value="1">Terça</option><option value="2">Quarta</option>
                <option value="3">Quinta</option><option value="4">Sexta</option><option value="5">Sábado</option>
              </select>
            </div>
            <div className="lv-field">
              <label>Horário</label>
              <input className="lv-input tabular" type="time" value={time} onChange={e => setTime(e.target.value)} />
            </div>
          </div>
          <div className="lv-field">
            <label>Observação <span className="lv-field__optional">(opcional)</span></label>
            <textarea className="lv-input" rows="3" placeholder="Notas sobre o agendamento"></textarea>
          </div>
        </div>
        <div className="lv-drawer__foot">
          <button className="lv-btn lv-btn--ghost" onClick={onClose}>Cancelar</button>
          <button className="lv-btn lv-btn--primary" onClick={handleSave} disabled={!plate || !customer}>Agendar</button>
        </div>
      </aside>
    </>
  );
}

window.AppointmentModal = AppointmentModal;
