import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { hideNavbar } from "../../components/navbar/showNavbarSlice";
import noEntryImg from "../404/no-entry.png";



export const Page404 = () => {
  const [count, setCount] = useState(6);
  const navigate = useNavigate();  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(hideNavbar());
    setTimeout(() => {
      navigate("/"); 
    }, 6000);

    setInterval(() => {
      setCount(count - 1);
    
    }, 1000);

  },[count])
 

  return (
    <div className="page404">
      <h2>No Further Way</h2>
      <span>
        Stay Put You are Redirecting in{" "}
        <span
          style={{ color: "red",  fontSize: "1.4em" }}
        >
          {count}
        </span>{" "}
        sec
      </span>
      <img src={noEntryImg} alt="no entry img" />
    </div>
  );
};
