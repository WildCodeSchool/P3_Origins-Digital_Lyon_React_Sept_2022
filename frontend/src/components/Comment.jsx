import axios from "axios";
import React, { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/userContext";
import CurrentVideosContext from "../../contexts/videosContext";

function Comment({ currentVideoComments, setCurrentVideoComments }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
        `${BACKEND_URL}/api/videos/infos/${selectedId}/comments/`,
        data,
        config
      )
      .then((response) => {
        console.warn(response);
        setComment("");
        fetch(`${BACKEND_URL}/api/videos/infos/${selectedId}`)
          .then((res) => res.json())
          .then((videos) => setCurrentVideoComments(videos.comment));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });
  myHeaders.append("Content-Type", "application/json");

  const DELETErequestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const deleteComment = () => {
    fetch(
      `${BACKEND_URL}/api/videos/infos/${selectedId}/comments/`,
      DELETErequestOptions
    ).then((res) => {
      if (res) {
        fetch(`${BACKEND_URL}/api/videos/infos/${selectedId}`)
          .then((response) => response.json())
          .then((videos) => setCurrentVideoComments(videos.comment));
      }
    });
  };

  return (
    <div className="comment">
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="comment-img">
          <img
            src={`${BACKEND_URL}/api/avatars/${user.avatar}`}
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
        <button type="submit">
          <img src="../../src/asset/image/send.png" alt="" />
        </button>
      </form>
      {currentVideoComments.map((videosComments) => (
        <div className="comment-author" key={videosComments.id}>
          <div className="comment-img">
            <img
              src={`${BACKEND_URL}/api/avatars/${videosComments.avatar}`}
              alt={`${videosComments.firstname}'s avatar`}
            />
          </div>
          <p>{videosComments.content}</p>
          {user.is_admin === 1 ? (
            <button
              type="button"
              onClick={() => {
                deleteComment(videosComments.id);
              }}
            >
              Supprimer
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Comment;
