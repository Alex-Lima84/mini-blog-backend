import { QueryError } from "mysql2"
import { db } from "../db"

export const getPosts = (req: any, res: any) => {

    const getPostsQuery = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"

    db.query(getPostsQuery, [req.query.cat], (error, data) => {
        if (error) return res.send(error)

        return res.status(200).json(data)
    })
}

export const getPost = (req: any, res: { json: (arg0: string) => void }) => {
    res.json("from post inside controller")
}

export const addPost = (req: any, res: { json: (arg0: string) => void }) => {
    res.json("from post inside controller")
}

export const deletePost = (req: any, res: { json: (arg0: string) => void }) => {
    res.json("from post inside controller")
}

export const updatePost = (req: any, res: { json: (arg0: string) => void }) => {
    res.json("from post inside controller")
}