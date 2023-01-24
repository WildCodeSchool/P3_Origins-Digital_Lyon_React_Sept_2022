/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
import axios from "axios";
import React, { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/userContext";
import CurrentVideosContext from "../../contexts/videosContext";

function Comment({ currentVideoComments }) {
  const { user, token } = useContext(CurrentUserContext);
  const { selectedId } = useContext(CurrentVideosContext);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const data = {
      content: comment,
      User_id: user.id,
      Videos_id: selectedId,
    };

    axios
      .post(
        `http://localhost:5000/api/videos/infos/${selectedId}/comments/`,
        data,
        config
      )
      .then((response) => {
        console.warn(response);
        setComment("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="comment">
      <form onSubmit={handleSubmit} className="comment-content">
        <div className="comment-img">
          <img
            src={`http://localhost:5000/api/avatars/${user.avatar}`}
            alt={`${user.firstname}'s avatar`}
          />
        </div>
        <input
          type="text"
          id="comment"
          value={comment}
          placeholder="Ajouter un commentaire..."
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Publier</button>
      </form>
      {currentVideoComments.map((videosComments) => (
        <div className="comment-author" key={videosComments.id}>
          <div className="comment-img">
            <img
              src={`http://localhost:5000/api/avatars/${videosComments.avatar}`}
              alt={`${videosComments.firstname}'s avatar`}
            />
          </div>
          {videosComments.firstname} : <br />
          {videosComments.content}
        </div>
      ))}
    </div>
  );
}

export default Comment;
