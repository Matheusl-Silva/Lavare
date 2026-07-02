/* global React, Icon */
const { useState: useConfirmState } = React;

function DeleteConfirm({ open, item, onClose, onConfirm }) {
  if (!open || !item) return null;
  return (
    <>
      <div className="lv-overlay" onClick={onClose} />
      <div className="lv-modal lv-modal--sm">
        <div className="lv-modal__head">
          <h2 className="h2">Excluir item</h2>
        </div>
        <div className="lv-modal__body">
          <p style={{ margin: 0, color: 'var(--fg-default)', lineHeight: 1.5 }}>
            Excluir <strong>{item.name}</strong> do estoque? Esta ação não pode ser desfeita.
          </p>
          <div className="lv-alert lv-alert--warning">
            <Icon name="alert-triangle" size={16} />
            <span>O item será removido permanentemente e não aparecerá nos relatórios futuros.</span>
          </div>
        </div>
        <div className="lv-modal__foot">
          <button className="lv-btn lv-btn--ghost" onClick={onClose}>Cancelar</button>
          <button className="lv-btn lv-btn--danger" onClick={() => { onConfirm(item); onClose(); }}>
            <Icon name="trash-2" size={14} /> Excluir item
          </button>
        </div>
      </div>
    </>
  );
}

window.DeleteConfirm = DeleteConfirm;
