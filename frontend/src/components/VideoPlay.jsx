import React from "react";

function VideoPlay() {
  return (
    <div className="video-play-container">
      <div className="video-play" />
      <h2>name video</h2>
      <p className="date-video">date</p>
      <p className="video-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ad
        assumenda asperiores labore, repudiandae explicabo reiciendis tenetur
        molestiae soluta quam veritatis.
      </p>
      <div className="interaction">
        <div className="category-play">
          <h3>categorie</h3>
        </div>
        <div className="like-share">
          <li className="favorite"></li>
          <li className="playlist"></li>
          <li className="share"></li>
        </div>
      </div>
    </div>
  );
}

export default VideoPlay;
