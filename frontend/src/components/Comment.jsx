import axios from "axios";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import CurrentUserContext from "../../contexts/userContext";
import CurrentVideosContext from "../../contexts/videosContext";
import defaultAvatar from "../asset/image/defaultAvatar.jpeg";

function Comment({ currentVideoComments, setCurrentVideoComments }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [getComId, setGetComId] = useState(0);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { user, token } = useContext(CurrentUserContext);
  const { selectedId, videoDate } = useContext(CurrentVideosContext);
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

  const deleteComment = (id) => {
    fetch(
      `${BACKEND_URL}/api/videos/infos/${selectedId}/comments/${id}`,
      DELETErequestOptions
    ).then((res) => {
      if (res) {
        fetch(`${BACKEND_URL}/api/videos/infos/${selectedId}`)
          .then((response) => response.json())
          .then((videos) => setCurrentVideoComments(videos.comment));
      }
    });
  };
  const handleOnError = (e) => {
    e.currentTarget.src = defaultAvatar;
  };

  Modal.defaultStyles.overlay.backgroundColor = "#333333AA";
  Modal.defaultStyles.content.backgroundColor = "#222222CC";
  Modal.defaultStyles.content.border = "#333333CC";

  return (
    <div>
      <div className="comment">
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-img">
            <img
              src={`${BACKEND_URL}/api/avatars/${user.avatar}`}
              alt={`${user.firstname}'s avatar`}
              onError={handleOnError}
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
              <h4>{videosComments.firstname}</h4>
            </div>
            <div className="comment-content">
              <p>{videosComments.content}</p>
              <h5>{videoDate(videosComments.creation_date)}</h5>
            </div>
            {user.is_admin === 1 ? (
              <button
                type="button"
                onClick={() => {
                  openModal();
                  setGetComId(videosComments.id);
                }}
              >
                <img
                  src="../../src/asset/image/delete.png"
                  alt="delete comment"
                />
              </button>
            ) : null}
          </div>
        ))}
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        contentLabel="Modal"
        style={{
          content: {
            height: "auto",
            bottom: "auto",
            width: "80vw",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <p>
          Voulez-vous vraiment supprimer le commentaire de {user.firstname} ?
        </p>
        <div className="modal-buttons">
          <button type="button" onClick={closeModal} className="close_btn">
            Fermer
          </button>
          <button
            className="delete_btn"
            type="button"
            onClick={() => {
              deleteComment(getComId);
              closeModal();
            }}
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Comment;
