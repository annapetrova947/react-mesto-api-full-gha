import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === user._id;
  const isLiked = props.card.likes.some((i) => i === user._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  return (
    <div className="element" key={props.card._id}>
      <img
        src={props.card.link}
        alt={props.card.name}
        className="element__photo"
        onClick={() => {
          props.handleCardClick(props.card);
        }}
      />
      {isOwn && (
        <button
          type="button"
          className="element__delete"
          onClick={() => {
            props.handleCardDelete(props.card);
          }}
        />
      )}
      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__likes">
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => {
            props.handleCardLike(props.card);
          }}
        />
        <p className="element__like-amount">{props.card.likes.length}</p>
      </div>
    </div>
  );
}
