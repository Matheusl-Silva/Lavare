/* global React, Icon */

function Catalog({ category, onCategory, items, onAdd }) {
  const fmt = v => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const cats = [
    { id: 'todos', label: 'Todos' },
    { id: 'servico', label: 'Serviços' },
    { id: 'produto', label: 'Produtos' },
  ];
  const filtered = category === 'todos' ? items : items.filter(i => i.kind === category);

  return (
    <div>
      <div className="lv-pill-row">
        {cats.map(c => (
          <button key={c.id} className={`lv-pill ${c.id === category ? 'is-active' : ''}`} onClick={() => onCategory(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="lv-catalog-grid">
        {filtered.map(item => (
          <button key={item.id} className="lv-prod-card" onClick={() => onAdd(item)}>
            <div className={`lv-prod-card__icon ${item.kind === 'produto' ? 'lv-prod-card__icon--prod' : ''}`}>
              <Icon name={item.icon} size={18} />
            </div>
            <div className="lv-prod-card__name">{item.name}</div>
            {item.dur && <div className="lv-prod-card__dur">{item.dur}</div>}
            <div className="lv-prod-card__price tabular">{fmt(item.price)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

window.Catalog = Catalog;
