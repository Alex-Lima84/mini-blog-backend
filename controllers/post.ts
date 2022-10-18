import { QueryError } from "mysql2"
import { db } from "../db"
import jwt from "jsonwebtoken"

export const getPosts = (req: any, res: any) => {

    const getPostsQuery = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"

    db.query(getPostsQuery, [req.query.cat], (error, data) => {
        if (error) return res.status(500).send(error)

        return res.status(200).json(data)
    })
}

export const getPost = (req: any, res: any) => {

    const getPostQuery = "SELECT `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"

    db.query(getPostQuery, [req.params.id], (error, data: any) => {
        if (error) return res.status(500).json(error)

        return res.status(200).json(data[0])

    })
}


export const addPost = (req: any, res: { json: (arg0: string) => void }) => {
    res.json("from post inside controller")
}


export const deletePost = (req: any, res: any) => {

    //First check if we have a JWT on our cookies in order to delete the post. If we don't have, we are not allowed to delete it.
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not Authenticated.")

    //If we have a token, we have to check the post we want to delete, belongs to us.
    jwt.verify(token, process.env.JWT_SECRET as string, (error: any, userInfo: any) => {
        if (error) return res.status(403).json("Token is not valid.")

        const postId = req.params.id
        const deletePostQuery = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        db.query(deletePostQuery, [postId, userInfo.id], (error, data) => {
            if (error) return res.status(403).json("You may delete only your posts.")

            return res.json("Post has been deleted.")
        })
    })
}


export const updatePost = (req: any, res: { json: (arg0: string) => void }) => {
    res.json("from post inside controller")
}

//Vídeo parou em 2:02:00