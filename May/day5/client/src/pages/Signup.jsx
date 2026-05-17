import React from "react";
import { useState } from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Signup = () => {
   const navigate = useNavigate();
    
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/users/signup",
        formdata,
      );
      setMessage(response.data.message);
     navigate("/login");
    } catch (error) {
       setMessage(error.data?.message || "Something went wrong");
      console.log(error.message);
    }
  };

  return (
    <>
    <h1>Signup</h1>
      <form onSubmit={handleSubmit}   >
        name:
        <input
          type="text"
          placeholder="enter name"
          name="name"
          value={formdata.name}
          onChange={(e) =>
            setFormData({ ...formdata, [e.target.name]: e.target.value })
          }
        />
        email:
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formdata.email}
          onChange={(e) =>
            setFormData({ ...formdata, [e.target.name]: e.target.value })
          }
        />

        password:
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formdata.password}
          onChange={(e) =>
            setFormData({ ...formdata, [e.target.name]: e.target.value })
          }
        />
        <input type="submit" name="Submit" />
         
      </form>
           {message && <p>{message}</p>}
    </>
  );
};

export default Signup;
