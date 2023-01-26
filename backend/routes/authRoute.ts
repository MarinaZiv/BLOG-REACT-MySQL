import express from "express";
const router = express.Router();
import {
  login,
  logout,
  register,
  getUserByCookie,
} from "../controllers/authController";

router
  .post("/register", register)
  .post("/login", login)
  .post("/logout", logout)
  .get("/user-by-cookie", getUserByCookie);
export default router;
