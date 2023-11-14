import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const user = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <div className="profile__avatar-icon">
            <button
              className="profile__avatar-edit"
              type="button"
              aria-label="Иконка карандаша"
            />
          </div>
          <img
            className="profile__avatar"
            alt="Фото профиля"
            src={user.avatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{user.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          />
          <p className="profile__about">{user.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {props.cards.map((card, i) => (
          <Card
            card={card}
            key={card._id}
            handleCardClick={props.onCardClick}
            handleCardLike={props.onCardLike}
            handleCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
