import React from "react";
import ok_image from "../images/ok.svg";
import error_image from "../images/error.svg";

export default function InfoTooltip(props) {
  let img;
  let text;

  if (props.status === "ok") {
    img = ok_image;
    text = "Вы успешно зарегистрировались!";
  } else {
    img = error_image;
    text = "Что-то пошло не так! Попробуйте ещё раз.";
  }

  if (props.isOpen) {
    return (
      <div id="modal_info" className="modal modal_type_add modal_show">
        <div className="modal__form">
          <button
            className="modal__close modal__close_photo"
            type="button"
            onClick={props.onClose}
          />
          <img src={img} className="modal__info" alt={props.status} />
          <p className="modal__info-title">{text}</p>
        </div>
      </div>
    );
  }
}
