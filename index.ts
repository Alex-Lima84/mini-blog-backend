import express from "express";
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import postRoutes from './routes/posts'

const app = express();

app.use(express.json());
app.use("/backend/auth", authRoutes)
app.use("/backend/users", userRoutes)
app.use("/backend/posts", postRoutes)

app.listen(8800, () => {
  console.log("Connected");
});
