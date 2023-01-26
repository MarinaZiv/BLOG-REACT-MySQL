// import express from "express";
// import cookieParser from "cookie-parser";
import { db } from "../db";
import { UserValidation } from "./userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;
// require("dotenv").config();
// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// REGISTER
export const register = (req, res) => {
  const { username, email, password } = req.body;
  const { error } = UserValidation.validate({ email, password });
  if (error) throw error;

  // CHECKING EXISTING USER:
  const q = `SELECT * FROM users WHERE email='${email}' OR username='${username}'`;
  db.query(q, (err, data) => {
    try {
      if (err) throw err;
      if (data.length) {
        return res.status(403).send({ message: `${email} already exists` });
      } else {
        // HASH PASSWORD & CREATING A NEW USER:
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const q = `INSERT INTO users (username, email, password) VALUES ("${username}", "${email}", "${hash}")`;
        db.query(q, (err, result) => {
          try {
            if (err) throw err;
            res.status(200).send({
              success: true,
              massege: `${email} has been registered`,
              user: { username, email },
            });
          } catch (error) {
            console.error(error);
            res.status(500).send({ error: error.message });
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.send({ error: error.message });
    }
  });
};

// LOGIN
export const login = (req, res) => {
  const { email, password } = req.body;
  const { error } = UserValidation.validate({ email, password });
  if (error) throw error;

  // CHECKING EXISTING USER:
  const q = `SELECT * FROM users WHERE email='${email}'`;
  db.query(q, (err, result) => {
    try {
      if (err) throw err;
      if (result.length === 0) throw new Error(`${email} not exists`);
      // SEPARATING PASSWORD FRON OTHER USER`S INFO:
      const { password, ...user } = result[0];

      // CHECK PASSWORD:
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, result[0].password);
      if (!isPasswordCorrect)
        throw new Error("username or password is incorrect");

      // CREATING COOKIE:
      const secret = process.env.JWT_SECRET;
      const JWTCookie = jwt.sign(
        { id: result[0].id, username: result[0].username },
        secret
      );

      res.cookie(
        "userCookie",
        JWTCookie,
        { httpOnly: true },
        { maxAge: 1000 * 60 * 60 * 12 }
      );
      // SENDING ONLY USER INFO WITHOUT PASSWORD
      res.send({ success: true, user});
    } catch (error) {
      console.error(error);
      res.send({ error: error.message });
    }
  });
};

// GET BY COOKIE
export const getUserByCookie = (req, res) => {
  try {
    const { userCookie } = req.cookies;
    if (!userCookie) throw new Error("userCookie not found");
    // console.log("userCookie is:", userCookie);
    const secret = process.env.JWT_SECRET;
    let decodedCookie = jwt.decode(userCookie, secret);
    // console.log(decodedCookie);
    // console.log("user is:", userCookie);
    res.send({ success: true, userCookie, decodedCookie });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
};

// LOGOUT
export const logout = (req, res) => {
  try {
    res
      .clearCookie("userCookie", "value", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send({ message: "User has been logged out" });
      
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
};
