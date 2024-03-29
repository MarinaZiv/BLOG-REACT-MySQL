import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { showNavbar } from "../navbar/showNavbarSlice";
import Post from "../../features/models/postInterface";


interface MenuProps {
  category: string;
}

export const Menu = ({ category }: MenuProps) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(showNavbar());
  }, []);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const { data } = await axios.get(`/posts/?category=${category}`);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllPosts();
  }, [category]);

  // const posts = [
  //   {
  //     id: "1",
  //     title: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet lorem id turpis lacinia, et.",
  //     img: "http://www.thechunkychef.com/wp-content/uploads/2017/02/Kentucky-Lemonade-Cocktail-4.jpg",
  //   },
  //   {
  //     id: "2",
  //     title: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet lorem id turpis lacinia, et.",
  //     img: "https://i0.wp.com/succulentcity.com/wp-content/uploads/2019/06/cactus-six-thorns-sc-1.jpg?resize=640%2C669&ssl=1",
  //   },
  //   {
  //     id: "3",
  //     title: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet lorem id turpis lacinia, et.",
  //     img: "https://thumbs.dreamstime.com/b/whole-banana-orange-lemon-apple-water-black-background-fresh-fruit-spray-179208969.jpg",
  //   },
  //   {
  //     id: "4",
  //     title: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet lorem id turpis lacinia, et.",
  //     img: "https://cdn.vox-cdn.com/thumbor/teCEQIxlj9RbCj6P_vlwMopAptQ=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/11545893/House_Calls_Brooklyn_Zames_Williams_living_room_2_Matthew_Williams.jpg",
  //   },
  // ];

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post: Post) => (
        <div className="post" key={post.id}>
          {/* <img src={post.img} alt="img" /> */}
          <img src={`../../upload/${post.img}`} alt={post.title} />
          <h2>{post.title}</h2>

          <Link className="link" to={`/post/${post.id}`}>
            <button>Read More...</button>
          </Link>
        </div>
      ))}
    </div>
  );
};
