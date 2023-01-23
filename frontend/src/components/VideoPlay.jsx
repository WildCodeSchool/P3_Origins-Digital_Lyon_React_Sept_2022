// /* eslint-disable react/prop-types */
// import axios from "axios";
// import React, { useContext, useState, useEffect } from "react";
// import { Player } from "video-react";
// import CurrentVideosContext from "../../contexts/videosContext";

// function VideoPlay({}) {
//   const { selectedName, selectedId, videoDate } =
//     useContext(CurrentVideosContext);

//   const [category, setCategory] = useState([]);
//   const [videoPlayed, setVideoPlayed] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${backUrl}/api/videos/infos/${selectedId}`)
//       .then((response) => {
//         setVideoPlayed(response.data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`${backUrl}/api/category/${categoryId}`)
//       .then((response) => {
//         setCategory(response.data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="video-play-container">
//       <Player
//         autoPlay
//         height={250}
//         width={300}
//         type="video/mp4"
//         src={`http://localhost:5000/api/videos/${selectedName}`}
//       />
//       <h2>{videoPlayed.name}</h2>
//       <p className="date-video">{videoDate(videoPlayed)}</p>
//       <p className="video-description">{videoPlayed.description}</p>
//       <div className="interaction">
//         <div className="category-play">
//           <h3>{category.name}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoPlay;
