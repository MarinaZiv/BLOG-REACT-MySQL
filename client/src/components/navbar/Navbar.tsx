import React, { useEffect } from "react";
import logo from "../../img/blog.png";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, updateUser } from "../../features/user/userSlice";
import axios from "axios";


export const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  // console.log("useAppSelector(selectUser) from Navbar is :", useAppSelector(selectUser));

  const handleLogout = async () => {
    await axios.post("/auth/logout", { user });
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  useEffect(() => {
    dispatch(updateUser(user));
    // console.log("dispatch from Navbar:", dispatch(updateUser(user)));
  }, [user.username]);

  // console.log("user from Navbar:", user);

  return (
    <div className="navbar">
      <div className="container">
        <NavLink className="link" to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </NavLink>
        <div className="links">
          <NavLink className="link" to="/?category=art">
            <h6>ART</h6>
          </NavLink>
          <NavLink className="link" to="/?category=science">
            <h6>SCIENCE</h6>
          </NavLink>
          <NavLink className="link" to="/?category=technology">
            <h6>TECHNOLOGY</h6>
          </NavLink>
          <NavLink className="link" to="/?category=cinema">
            <h6>CINEMA</h6>
          </NavLink>
          <NavLink className="link" to="/?category=design">
            <h6>DESIGN</h6>
          </NavLink>
          <NavLink className="link" to="/?category=food">
            <h6>FOOD</h6>
          </NavLink>
          <span className="username">{user.username}</span>
          {user.username ? (
            <span onClick={handleLogout} style={{ color: "#575fcf" }}>
              Logout
            </span>
          ) : (
            <Link
              className="link"
              to="/login"
            >
              <span style={{ color: "#575fcf", textTransform: "uppercase" }}>
                Login
              </span>
            </Link>
          )}
          <span>
            <NavLink className="write" to="/write">
              Write
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};
