import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import axios from "axios";
import { showNavbar, hideNavbar } from "../../components/navbar/showNavbarSlice";
import { updateUser } from "../user/userSlice";


export const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hideNavbar());
  }, []);


  const handleLogin = async (e: React.FormEvent<Element> | any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", inputs);
      const { user } = data;
      // console.log("user from handleLogin:", user);
      // console.log("Username from handleLogin:", data.user.username);

      if (user) {
        navigate("/");
        dispatch(showNavbar());
        localStorage.setItem("currentUser", JSON.stringify(user));
        dispatch(updateUser(data.user));
        // console.log("From getUserByCookieAsync: ", data.user);
      }
    } catch (error: any) {
      console.error(error);  
    }
  };

  
  const handleChange = (e: React.FormEvent<Element> | any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log(inputs)

  return (
    <div className="border">
      <div className="auth">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="formInput"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="formInput"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="formInput"
            required
            onChange={handleChange}
          />
          <button type="submit" className="formBtn">
            Login
          </button>
          <span>
            Don`t you have an account?{" "}
            <Link className="link" to="/register">
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
