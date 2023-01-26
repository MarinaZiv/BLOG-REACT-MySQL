import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showNavbar } from "../../components/navbar/showNavbarSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Menu } from "../../components/menu/Menu";
import { selectUser } from "../user/userSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import moment from "moment";
import axios from "axios";
// https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIlzGp1laQheiAAjrbJJ3pasHLjMBnIUEZg&usqp=CAU

export const Single = () => {
  const [post, setPost] = useState<any>({});
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  // console.log(location);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showNavbar());
  }, []);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`/posts/${postId}`);
        setPost(data);
        console.log("From getPost: ", data);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/posts/${postId}`);
      console.log("from handleDelete: ", data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../../upload/${post?.postImg}`} alt="post img" />
        {/* <img src={post?.postImg} alt="post img" /> */}
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="user img" />}
          <div className="info">
            <span className="username">{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {user.username === post.username && (
            <div className="edit">
              <Link className="link" to={`/write?edit=2`} state={post}>
                <AiFillEdit />
              </Link>
            </div>
          )}
          {user.username === post.username && (
            <div className="delete" onClick={handleDelete}>
              <RiDeleteBin6Line />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        {getText(post.description)}
      </div>
      <div className="menu">
        <Menu category={post.category} />
      </div>
    </div>
  );
};
