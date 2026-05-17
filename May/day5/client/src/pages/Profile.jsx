import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const fetchData = async () => {
  try {
      const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:5000/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setData(response.data);

  } catch (error) {
    console.log(error.message)
  }
  };

  useEffect(() => {
    fetchData();
  }, []);


const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('/login')
}

  return (
    <>
    <h1>Profile</h1>
      <h1> Welcome, {data.user?.name} </h1>
      <button onClick={handleLogout} >Logout</button>
    </>
  );
};

export default Profile;
