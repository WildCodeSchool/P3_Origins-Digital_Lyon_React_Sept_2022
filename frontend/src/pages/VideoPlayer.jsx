// /* eslint-disable react/prop-types */
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Navbar from "../components/Navbar";
// import Slider from "../components/Slider";
// import Comment from "../components/Comment";
// import VideoPlay from "../components/VideoPlay";
// import CurrentVideosContext from "contexts/videosContext";

// function VideoPlayer() {
//   const { selectedId } = useContext(CurrentVideosContext);

//   const backUrl = import.meta.env.VITE_BACKEND_URL;

//   const [category, setCategory] = useState([]);

//   const comment = {
//     author: {
//       name: "John Doe",
//       avatar: "../../src/asset/image/user.svg",
//     },
//     message: "This is a great video!",
//   };

//   return (
//     <div className="player-page">
//       <Header />
//       <Navbar />
//       <VideoPlay />
//       <Slider />
//       <Comment author={comment.author} message={comment.message} />
//     </div>
//   );
// }

// export default VideoPlayer;
