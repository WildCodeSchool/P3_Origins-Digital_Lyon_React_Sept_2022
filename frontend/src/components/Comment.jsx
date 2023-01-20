/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/userContext";

function Comment() {
  const { user } = useContext(CurrentUserContext);
  return (
    <div className="comment">
      <input type="text" placeholder="Ajouter un commentaire..." />
      <div className="comment-author">
        <div className="comment-img">
          <img
            src={`http://localhost:5000/api/avatars/${user.avatar}`}
            alt={`${user.firstname}'s avatar`}
          />
        </div>
        <div className="comment-content">
          <p>{user.firstname}</p>
          <p className="comment-message">{}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
