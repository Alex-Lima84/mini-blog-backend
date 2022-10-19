import express from "express";
import cookieParser from "cookie-parser";
import multer from 'multer'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import postRoutes from './routes/posts'

const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cookieParser())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage })

app.post('/backend/upload', upload.single('file'), function (req, res) {
  const file = req.file
  res.status(200).json(file?.filename)
})

app.use("/backend/auth", authRoutes)
app.use("/backend/users", userRoutes)
app.use("/backend/posts", postRoutes)

app.listen(8800, () => {
  console.log("Connected");
});
