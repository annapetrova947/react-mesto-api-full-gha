import PopupWithForm from "./PopupWithForm.js";
import React from "react";

export default function AddPlacePopup(props) {
  const refInputName = React.useRef();
  const refInputLink = React.useRef();

  React.useEffect(() => {
    refInputName.current.value = "";
    refInputLink.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      name: refInputName.current.value,
      link: refInputLink.current.value,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      save_button="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={refInputName}
        id="place_name"
        type="text"
        name="name"
        className="form__input form__input_type_placename"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
      />
      <span className="form__input-error" id="place_name-error" />
      <input
        ref={refInputLink}
        id="link"
        type="url"
        name="link"
        className="form__input form__input_type_link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__input-error" id="link-error" />
    </PopupWithForm>
  );
}
