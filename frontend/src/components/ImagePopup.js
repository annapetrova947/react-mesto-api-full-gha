import React from "react";

export default function ImagePopup(props) {
  if (props.isOpen) {
    return (
      <div
        id="modal_photo"
        className="modal modal_type_photo modal_show-img modal_show"
      >
        <div className="modal__conteiner">
          <button
            className="modal__close modal__close_photo"
            type="button"
            onClick={props.onClose}
          />
          <img
            src={props.card.link}
            className="modal__photo"
            alt={props.card.name}
          />
          <p className="modal__title">{props.card.name}</p>
        </div>
      </div>
    );
  }
}
