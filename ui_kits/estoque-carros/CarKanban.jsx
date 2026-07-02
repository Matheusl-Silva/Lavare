/* global React, Icon */

function CarCard({ car, onAdvance, onCancel }) {
  const statusMeta = {
    wait:  { label: 'Aguardando',          next: 'Iniciar lavagem',   nextIcon: 'play' },
    wash:  { label: 'Em lavagem',          next: 'Marcar como pronto', nextIcon: 'check' },
    ready: { label: 'Pronto para retirada', next: 'Confirmar entrega', nextIcon: 'check-check' },
  };
  const m = statusMeta[car.status];
  return (
    <div className={`lv-car-card lv-car-card--${car.status}`}>
      <div className="lv-car-card__top">
        <span className="lv-plate tabular">{car.plate}</span>
        <button className="lv-icon-btn lv-icon-btn--sm"><Icon name="more-horizontal" size={16} /></button>
      </div>
      <div className="lv-car-card__model">{car.model}</div>
      <div className="lv-car-card__service">{car.service}</div>
      <div className="lv-car-card__meta">
        <span className="lv-car-card__meta-item"><Icon name="user" size={13} /> {car.customer}</span>
        <span className="lv-car-card__meta-item tabular"><Icon name="clock" size={13} /> {car.duration}</span>
      </div>
      <div className="lv-car-card__amount tabular">R$ {car.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
      {car.status !== 'done' && (
        <button className="lv-btn lv-btn--secondary lv-btn--sm lv-car-card__action" onClick={() => onAdvance(car)}>
          <Icon name={m.nextIcon} size={14} stroke={2} /> {m.next}
        </button>
      )}
    </div>
  );
}

function Column({ status, title, color, cars, onAdvance, onCancel }) {
  return (
    <div className="lv-col">
      <div className="lv-col__head">
        <span className="lv-col__title">
          <span className="lv-dot" style={{ background: color }}></span>
          {title}
          <span className="lv-col__count">{cars.length}</span>
        </span>
        <button className="lv-icon-btn lv-icon-btn--sm"><Icon name="more-horizontal" size={16} /></button>
      </div>
      <div className="lv-col__body">
        {cars.length === 0 && (
          <div className="lv-col__empty">Nenhum carro neste estágio.</div>
        )}
        {cars.map(c => <CarCard key={c.id} car={c} onAdvance={onAdvance} onCancel={onCancel} />)}
      </div>
    </div>
  );
}

function CarKanban({ cars, onAdvance, onCancel }) {
  const cols = [
    { status: 'wait',  title: 'Aguardando',           color: 'var(--warning-500)' },
    { status: 'wash',  title: 'Em lavagem',           color: 'var(--brand-500)' },
    { status: 'ready', title: 'Pronto para retirada', color: 'var(--success-500)' },
  ];
  return (
    <div className="lv-kanban">
      {cols.map(c => (
        <Column key={c.status}
          status={c.status} title={c.title} color={c.color}
          cars={cars.filter(x => x.status === c.status)}
          onAdvance={onAdvance} onCancel={onCancel}
        />
      ))}
    </div>
  );
}

window.CarKanban = CarKanban;
window.CarCard = CarCard;
