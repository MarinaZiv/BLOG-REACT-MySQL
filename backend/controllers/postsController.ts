import { db } from "../db";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const getPosts = (req, res) => {
  const q = req.query.category
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.category], (err, result) => {
    try {
      if (err) throw err;
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `description`, p.img AS postImg, u.img AS userImg, `category`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, result) => {
    try {
      console.log(req.params.id);
      if (err) throw err;
      res.status(200).send(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  });
};

export const addPost = (req, res) => {
  try {
    const { title, description, img, category, date } = req.body;
    const JWTCookie = req.cookies.userCookie;
    if (!JWTCookie)
      return res.status(401).send({ message: "Not authenticated!" });

    const secret = process.env.JWT_SECRET;
    jwt.verify(JWTCookie, secret, (err, userInfo) => {
      if (err) return res.send({ message: "JWTCookie is not valid!" });

      const q =
        "INSERT INTO posts(`title`, `description`, `img`, `category`, `date`,`uid`) VALUES (?)";

      const values = [title, description, img, category, date, userInfo.id];
      db.query(q, [values], (err, result) => {
        try {
          if (err) throw err;
          res.send({ message: "Post has been created" });
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: error.message });
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
};

export const deletePost = (req, res) => {
  try {
    const JWTCookie = req.cookies.userCookie;
    if (!JWTCookie) {
      res.status(401).send({ message: "Not authenticated!" });
    }
    const secret = process.env.JWT_SECRET;
    jwt.verify(JWTCookie, secret, (err, userInfo) => {
      if (err)
        return res.status(403).send({ message: "JWTCookie is not valid!" });

      const postId = req.params.id;
      const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

      db.query(q, [postId, userInfo.id], (err) => {
        try {
          if (err)
            return res
              .status(403)
              .send({ message: "You can delete only your post!" });
          res.status(200).send({ message: "Post has been deleted!" });
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: error.message });
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
};

export const updatePost = (req, res) => {
  const { title, description, img, category } = req.body;
  if (!title || !description || !img || !category)
    throw new Error("Data is missing...");
  try {
    const JWTCookie = req.cookies.userCookie;
    if (!JWTCookie)
      return res.status(401).send({ message: "Not authenticated!" });

    const secret = process.env.JWT_SECRET;
    jwt.verify(JWTCookie, secret, (err, userInfo) => {
      if (err)
        return res.status(403).send({ message: "JWTCookie is not valid!" });

      const postId = req.params.id;
      const q =
        "UPDATE posts SET `title`=?, `description`=?, `img`=?, `category`=? WHERE `id`=? AND `uid`=? ";

      const values = [title, description, img, category];
      db.query(q, [...values, postId, userInfo.id], (err, result) => {
        try {
          if (err) throw err;
          res.send({ message: "Post has been updated" });
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: error.message });
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
};
