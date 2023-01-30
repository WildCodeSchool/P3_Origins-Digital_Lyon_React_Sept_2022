import React, { useContext } from "react";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import CurrentUserContext from "../../contexts/userContext";
import Profil from "../components/Profil";

function ProfilePage() {
  const { user } = useContext(CurrentUserContext);
  return (
    <div className="profilPageContainer">
      {user.email ? <Profil /> : <Login />}
      <Navbar />
    </div>
  );
}

export default ProfilePage;
