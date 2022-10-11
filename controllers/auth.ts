import { db } from "../db"
import bcrypt from "bcryptjs"


export const register = (req: any, res: any) => {

    //Check if user exists
    const userSelectQuery = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(userSelectQuery, [req.body.email, req.body.username], (error, data) => {
        if (error) return res.json(error)
        if (Array.isArray(data) && data.length) return res.status(409).json("User already registered")

        //Password encryption
        var unprotectedPassword = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(req.body.password, unprotectedPassword);

        //Insert user into the db
        const userInsertQuery = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
        ]
        db.query(userInsertQuery, [values], (error, data) => {
            if (error) return res.json(error)
            return res.status(200).json("User has been created")
        })
    })
}

export const login = (req: any, res: any) => {

    //Check if user exists
    const userSelectQuery = "SELECT * FROM users WHERE username = ?"
    db.query(userSelectQuery, [req.body.username], (error, data: any) => {
        if (error) return res.json(error)
        if (Array.isArray(data) && data.length === 0) return res.status(404).json("User not found")

        //Check matching passwords
        const correctPasswords = bcrypt.compareSync(req.body.password, data[0].password)

        if (!correctPasswords) return res.status(400).json("Worng username or password")
    })
}

export const logout = (req: any, res: any) => {

}

// vídeo parou em 1:22:00 https://www.youtube.com/watch?v=0aPLk2e2Z3g