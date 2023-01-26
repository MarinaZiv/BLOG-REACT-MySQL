import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showNavbar } from "../../components/navbar/showNavbarSlice";
import { useAppDispatch } from "../../app/hooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

export const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState((state?.description) || "");
  const [category, setCategory] = useState(state?.category || "");
  const [file, setFile] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // console.log(value);

  useEffect(() => {
    dispatch(showNavbar());
  }, []);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("from formData: ", formData);
      const { data } = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // console.log("from upload: ", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log("from WRITE imgUrl from handleSubmit: ", imgUrl);
    navigate('/');

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            description: value,
            category,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          })
        : await axios.post(`/posts/`, {
            title,
            description: value,
            category,
            img: imgUrl,
           
          });
          
      console.log("post from handleSubmit: ", {
        title,
        description: value,
        category,
        img: imgUrl,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="wrapper">
      <div className="add">
        <div className="content">
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>            
            <span>
              <b>Visibilty: </b> Public
            </span>
            <input
              type="file"
              id="file"
              name="file"
              style={{ display: "none" }}
              onChange={(e:any) => setFile(e.target.files[0])}
              accept="image/*"
              multiple={false}
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
            <div className="buttons">
              <button>Safe as a draft</button>
              <button onClick={handleSubmit}>Publish</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="category">
              <input
                type="radio"
                checked={category === "art"}
                name="category"
                id="art"
                value="art"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="art">Art</label>
            </div>
            <div className="category">
              <input
                type="radio"
                checked={category === "science"}
                name="category"
                id="science"
                value="science"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="science">science</label>
            </div>
            <div className="category">
              <input
                type="radio"
                checked={category === "technology"}
                name="category"
                id="technology"
                value="technology"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="category">
              <input
                type="radio"
                checked={category === "cinema"}
                name="category"
                id="cinema"
                value="cinema"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="category">
              <input
                type="radio"
                checked={category === "design"}
                name="category"
                id="design"
                value="design"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="design">Design</label>
            </div>
            <div className="category">
              <input
                type="radio"
                checked={category === "food"}
                name="category"
                id="food"
                value="food"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
