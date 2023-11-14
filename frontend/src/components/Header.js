import logo from "../images/logo.svg";
import React from "react";
import { Link, useNavigate, Route, Routes } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem("token");
    props.onLogout();
    navigate("/sign-in");
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <ul className="header__navigation">
              <li>
                <p className="header__email">{props.userEmail}</p>
              </li>
              <li>
                <Link
                  className="header__link header__link_exit"
                  onClick={handleSignOut}
                >
                  Выйти
                </Link>
              </li>
            </ul>
          }
        ></Route>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        ></Route>
      </Routes>
    </header>
  );
}
