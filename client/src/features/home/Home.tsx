import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { showNavbar } from "../../components/navbar/showNavbarSlice";
import Post from "../models/postInterface";


export const Home = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const category = useLocation().search;
  // console.log(location);

  useEffect(() => {
    dispatch(showNavbar());
  }, []);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const { data } = await axios.get(`/posts/${category}`);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllPosts();
  }, [category]);

  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post: Post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <Link className="link" to={`/post/${post.id}`}>
                <img src={`../../upload/${post.img}`} alt={post.title} />
                {/* <img src={post.img} alt="img" /> */}
              </Link>
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.description.substring(0, 500))}</p>
              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More...</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
