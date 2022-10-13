import { db } from "../db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

        if (!correctPasswords) return res.status(400).json("Wrong username or password")

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET as string)

        //Prevent passing the password in the cookie, even if it is hashed.
        const { password, ...otherFields } = data[0]

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(otherFields)
    })
}

export const logout = (req: any, res: any) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out")
}