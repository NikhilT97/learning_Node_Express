import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate()
  const [message, setMessgage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        formData,
      );

      setMessgage(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate('/profile')
    } catch (error) {
      setMessgage(error.response?.data?.message|| "some error occured");
      console.log(error.message)
    }
  };

  return (
    <>
    <h1>Login</h1>

      <form action="" onSubmit={handleSubmit}>
        email:
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        password:
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <input type="submit" name="Submit" />
      </form>

      <p>no account? you can <button onClick={()=> navigate('/signup')}>Signup</button> </p>
    </>
  );
};

export default Login;
