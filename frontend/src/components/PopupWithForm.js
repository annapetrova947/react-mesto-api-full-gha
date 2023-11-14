import React from "react";

export default function PopupWithForm(props) {
  return (
    <div
      id={`modal_${props.name}`}
      className={`modal modal_type_${props.name} ${
        props.isOpen && "modal_show"
      }`}
    >
      <div className="modal__form">
        <button
          className="modal__close"
          type="button"
          onClick={props.onClose}
        />
        <form
          className={`form form_${props.name}`}
          name={`${props.name}_form`}
          onSubmit={props.onSubmit}
        >
          <h3 className="form__title">{props.title}</h3>
          {props.children}
          <button type="submit" className="form__submit-button">
            {props.save_button}
          </button>
        </form>
      </div>
    </div>
  );
}
