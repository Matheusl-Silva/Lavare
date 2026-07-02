/* global React, Icon */

function CartPanel({ cart, onInc, onDec, plate, onPlate, customer, onCustomer, method, onMethod, onCheckout }) {
  const fmt = v => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = subtotal >= 300 ? subtotal * 0.05 : 0;
  const total = subtotal - discount;

  const methods = [
    { id: 'Pix', label: 'Pix', icon: 'qr-code' },
    { id: 'Dinheiro', label: 'Dinheiro', icon: 'banknote' },
    { id: 'Cartão', label: 'Cartão', icon: 'credit-card' },
    { id: 'Débito', label: 'Débito', icon: 'wallet' },
  ];

  return (
    <div className="lv-cart">
      <div className="lv-cart__head">
        <h2 className="h3">Carrinho</h2>
        <span className="lv-cart__count tabular">{count} {count === 1 ? 'item' : 'itens'}</span>
      </div>

      <div className="lv-cart__items">
        {cart.length === 0 && (
          <div className="lv-cart__empty">Nenhum item adicionado.<br />Toque em um serviço ou produto à esquerda.</div>
        )}
        {cart.map(item => (
          <div key={item.id} className="lv-cart-item">
            <div className="lv-cart-item__main">
              <div className="lv-cart-item__name">{item.name}</div>
              <div className="lv-cart-item__price tabular">{fmt(item.price)} cada</div>
            </div>
            <div className="lv-stepper">
              <button onClick={() => onDec(item.id)} aria-label="Diminuir"><Icon name="minus" size={14} /></button>
              <span className="lv-stepper__val">{item.qty}</span>
              <button onClick={() => onInc(item.id)} aria-label="Aumentar"><Icon name="plus" size={14} /></button>
            </div>
            <div className="lv-cart-item__line tabular">{fmt(item.price * item.qty)}</div>
          </div>
        ))}
      </div>

      <div className="lv-cart__foot">
        <div className="lv-cart-fields">
          <input className="lv-cart-input" value={customer} onChange={e => onCustomer(e.target.value)} placeholder="Cliente (opcional)" />
          <input className="lv-cart-input tabular" value={plate} onChange={e => onPlate(e.target.value.toUpperCase())} placeholder="Placa do veículo" maxLength={7} />
        </div>

        <div className="lv-pay-grid">
          {methods.map(m => (
            <button key={m.id} className={`lv-pay-btn ${method === m.id ? 'is-active' : ''}`} onClick={() => onMethod(m.id)}>
              <Icon name={m.icon} size={16} /> {m.label}
            </button>
          ))}
        </div>

        <div className="lv-cart-summary">
          <div className="lv-cart-summary__row"><span>Subtotal</span><span className="tabular">{fmt(subtotal)}</span></div>
          {discount > 0 && (
            <div className="lv-cart-summary__row"><span>Desconto (5%)</span><span className="tabular">− {fmt(discount)}</span></div>
          )}
          <div className="lv-cart-summary__total">
            <span>Total</span>
            <strong className="tabular">{fmt(total)}</strong>
          </div>
        </div>

        <button className="lv-btn lv-btn--primary lv-btn--block" onClick={onCheckout} disabled={cart.length === 0}>
          <Icon name="check" size={16} stroke={2} /> Finalizar venda · {fmt(total)}
        </button>
      </div>
    </div>
  );
}

window.CartPanel = CartPanel;
