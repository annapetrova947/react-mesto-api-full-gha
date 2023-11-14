import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const user = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(user.name);
  const [description, setDescription] = React.useState(user.about);

  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [props.isOpen, user]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      save_button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        type="text"
        name="name"
        className="form__input form__input_type_name"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="form__input-error" id="name-error" />
      <input
        id="about"
        type="text"
        name="about"
        className="form__input form__input_type_about"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span className="form__input-error" id="about-error" />
    </PopupWithForm>
  );
}
