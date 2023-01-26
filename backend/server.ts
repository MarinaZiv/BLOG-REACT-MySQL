import express from "express";
import authRoutes from "./routes/authRoute";
import postRoutes from "./routes/postsRoute";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 4021;
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  "../client/public/upload",
  express.static(path.join(__dirname, "../client/public/upload"))
);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {   
    cb(null, Date.now()+file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  try {   
    //@ts-ignore
    const file = req.file.filename;
    res.send(file);
    //@ts-ignore
    console.log(file, {url: `../client/public/upload/${file}`});
    console.log("file: ", file);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});


app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port} `);
});
