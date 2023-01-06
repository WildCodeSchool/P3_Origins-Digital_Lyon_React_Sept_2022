import React, { useContext } from "react";
import Login from "../components/Login";
import AdminDashboard from "../components/AdminDashboard";
import Navbar from "../components/Navbar";
import CurrentUserContext from "../../contexts/userContext";
import Profil from "../components/Profil";

function ProfilePage() {
  const { user } = useContext(CurrentUserContext);
  return (
    <div>
      {user.email ? <Profil /> : <Login />}
      {user.is_admin ? <AdminDashboard /> : <Profil />}
      <AdminDashboard />
      <Navbar />
    </div>
  );
}

export default ProfilePage;
