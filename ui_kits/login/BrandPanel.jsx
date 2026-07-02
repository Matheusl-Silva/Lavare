/* global React */
function Icon({ name, size = 20, stroke = 1.75, style = {} }) {
  return <i data-lucide={name} style={{ width: size, height: size, strokeWidth: stroke, ...style }} />;
}

function BrandPanel() {
  return (
    <aside className="lv-brand-panel">
      <div className="lv-brand-panel__top">
        <img src="../../assets/logo.svg" alt="Lavare" height="32" style={{ filter: 'brightness(0) invert(1)' }} />
      </div>
      <div className="lv-brand-panel__mid">
        <h2 className="lv-brand-panel__quote">
          Tenha visibilidade total do que entra, sai e está rodando no seu lava-jato — em um único lugar.
        </h2>
        <div className="lv-brand-panel__features">
          <div className="lv-brand-feature">
            <Icon name="wallet" size={18} />
            <span>Controle financeiro completo</span>
          </div>
          <div className="lv-brand-feature">
            <Icon name="package" size={18} />
            <span>Estoque de produtos sempre em dia</span>
          </div>
          <div className="lv-brand-feature">
            <Icon name="car" size={18} />
            <span>Fila de carros em tempo real</span>
          </div>
        </div>
      </div>
      <div className="lv-brand-panel__bottom">
        <span className="caption" style={{ color: 'rgba(255,255,255,0.6)' }}>© 2026 Lavare. Todos os direitos reservados.</span>
      </div>
    </aside>
  );
}

window.BrandPanel = BrandPanel;
window.Icon = Icon;
