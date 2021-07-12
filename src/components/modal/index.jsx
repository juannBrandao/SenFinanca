import React from "react";
import "./index.css";
const Modal = (props) => {
  return (
    <div
      className={`modal ${props.show ? "show" : ""}`}
      onClick={props.onClose}
      id="modalTransaction"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Transação Financeira</h4>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <button className="button" data-testid="close_modal" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
