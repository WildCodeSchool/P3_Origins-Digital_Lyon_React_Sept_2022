// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReturnPageButton from "./ReturnPageButton";
// import VideoBox from "./VideoBox";

// function CategoryTable({ category }) {
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     axios
//       .post("http://localhost:5000/api/category", category)
//       .then(() => {
//         console.log(category);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div className="video-table-container">
//       <ReturnPageButton />
//       <h3>Liste vidéos</h3>
//       <input
//         className="search-video"
//         type="text"
//         placeholder="Rechercher une vidéo"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       {search !== "" ? (
//         <div className="video-table">
//           {category
//             .filter((cat) => cat.name.toLowerCase().includes(search))

//             .map((video) => (
//               <div className="video-list">
//                 <ul key={video.id} className="video-info">
//                   <VideoBox video={video} className="video-box-manage" />
//                 </ul>
//                 <ul className="video-manage">
//                   <li>#{video.id}</li>

//                   <li>
//                     {!video.is_admin ? (
//                       <button
//                         type="button"
//                         onClick={() => {
//                           deleteVideo(video.id);
//                         }}
//                       >
//                         Supprimer
//                       </button>
//                     ) : null}
//                   </li>
//                 </ul>
//               </div>
//             ))}
//         </div>
//       ) : (
//         <div className="video-table">
//           <div>
//             {videosList.map((video) => {
//               return (
//                 <div className="video-list">
//                   <ul key={video.id} className="video-info">
//                     <VideoBox video={video} className="video-box-manage" />
//                   </ul>
//                   <ul className="video-manage">
//                     <li>#{video.id}</li>

//                     <li>
//                       {!video.is_admin ? (
//                         <button
//                           type="button"
//                           onClick={() => {
//                             deleteCategory(category.id);
//                           }}
//                         >
//                           Supprimer
//                         </button>
//                       ) : null}
//                     </li>
//                   </ul>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//       <Navbar />
//     </div>
//   );
// }

// export default CategoryTable;
