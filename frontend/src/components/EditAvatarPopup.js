import PopupWithForm from "./PopupWithForm.js";
import React from "react";

export default function EditAvatarPopup(props) {
  //const user = React.useContext(CurrentUserContext);
  const refInput = React.useRef();

  React.useEffect(() => {
    refInput.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: refInput.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      save_button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={refInput}
        id="avatar_link"
        type="url"
        name="avatar"
        className="form__input form__input_type_avatar-link"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="form__input-error" id="avatar_link-error" />
    </PopupWithForm>
  );
}
