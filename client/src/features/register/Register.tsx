import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { hideNavbar } from "../../components/navbar/showNavbarSlice";
import { registerAsync } from "../user/userAPI";

export const Register = () => {   
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  dispatch(hideNavbar());

  const handleChange = (e: React.FormEvent<Element> | any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log(inputs)

  const handleRegister = (e: React.FormEvent<Element> | any) => {
    e.preventDefault();
    // OLD FATION INPUTS VALUE (WORKING)
    // let { username, email, password } = e.target.elements;
    // username = username.value;
    // email = email.value;
    // password = password.value;
    // console.log(username, email, password);
    // dispatch(registerAsync({ username, email, password }));
    dispatch(registerAsync(inputs));
    console.log(inputs);
    navigate("/login");
  };

  // NON REDUX-TOOLKIT WAY (WORKING)
  // const handleRegister = async (e: React.FormEvent<Element> | any) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post("/auth/register", inputs);
  //     console.log(data);
  //     navigate("/login");
  //     // const error = new AxiosError();
  //   } catch (error: any) {
  //     console.error(error);
  //     // console.dir({ error: AxiosError });
  //     // console.dir(err.response.data);
  //     setLoginError(error.message);
  //   }
  // };

  return (
    <div className="border">
      <div className="auth">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
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
            Register
          </button>
          <span>
            Do you have an account?{" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
