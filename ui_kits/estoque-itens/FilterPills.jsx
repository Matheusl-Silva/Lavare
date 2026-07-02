/* global React */
function FilterPills({ categories, active, onSelect }) {
  return (
    <div className="lv-pill-row">
      {categories.map(c => (
        <button key={c.id} className={`lv-pill ${c.id === active ? 'is-active' : ''}`} onClick={() => onSelect(c.id)}>
          {c.label}
          <span className="lv-pill__count">{c.count}</span>
        </button>
      ))}
    </div>
  );
}
window.FilterPills = FilterPills;
