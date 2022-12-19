import React from "react";

function Comment({ author, message }) {
  return (
    <div className="comment">
      <input type="text" placeholder="Ajouter un commentair..." />
      <div className="comment-author">
        <div className="comment-img">
          <img src={author.avatar} alt={`${author.name}'s avatar`} />
        </div>
        <div className="comment-content">
          <p>{author.name}</p>
          <p className="comment-message">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
