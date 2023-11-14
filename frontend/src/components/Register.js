import React from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const refInputEmail = React.useRef();
  const refInputPassword = React.useRef();

  React.useEffect(() => {
    refInputEmail.current.value = "";
    refInputPassword.current.value = "";
  }, []);

  function register(e) {
    e.preventDefault();
    console.log(refInputEmail.current.value, refInputPassword.current.value);
    props.onRegister(
      refInputEmail.current.value,
      refInputPassword.current.value,
    );
  }

  return (
    <form className="form form_auth" onSubmit={register}>
      <h3 className="form__title form__title_auth">Регистрация</h3>
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
        className="form__submit-button form__submit-button_auth"
      >
        Зарегистрироваться
      </button>
      <p className="form__question">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="form__question_link">
          Войти
        </Link>
      </p>
    </form>
  );
}
