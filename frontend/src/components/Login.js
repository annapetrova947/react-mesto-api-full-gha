import React from "react";

export default function Login(props) {
  const refInputEmail = React.useRef();
  const refInputPassword = React.useRef();

  React.useEffect(() => {
    refInputEmail.current.value = "";
    refInputPassword.current.value = "";
  }, []);

  function login(e) {
    e.preventDefault();

    props.onLogin(refInputEmail.current.value, refInputPassword.current.value);
  }

  return (
    <form className="form form_auth" onSubmit={login}>
      <h3 className="form__title form__title_auth">Вход</h3>
      <input
        ref={refInputEmail}
        id="email"
        type="email"
        name="name"
        className="form__input form__input_auth"
        placeholder="Email"
        required
        minLength={2}
        maxLength={30}
      />

      <input
        ref={refInputPassword}
        id="password"
        type="password"
        name="password"
        className="form__input form__input_auth"
        placeholder="Пароль"
        required
      />

      <button
        type="submit"
        className="form__submit-button form__submit-button_auth form__submit-button_auth-enterance"
      >
        Войти
      </button>
    </form>
  );
}
