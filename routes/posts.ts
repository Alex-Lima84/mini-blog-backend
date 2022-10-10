import express from "express";
import { addPost } from "../controllers/post";

const router = express.Router()

router.get("/test", addPost)

export default router

// vídeo parou em 1:04:30 https://www.youtube.com/watch?v=0aPLk2e2Z3g