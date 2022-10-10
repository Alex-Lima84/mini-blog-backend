import { db } from "../db"
import bcrypt from "bcryptjs"

export const register = (req: any, res: any) => {

    //Check existing user
    const userSelectQuery = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(userSelectQuery, [req.body.email, req.body.username], (error, data) => {
        if (error) return res.json(error)
        if (data.length) return res.status(409).json("User already registered")

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

}

export const logout = (req: any, res: any) => {

}