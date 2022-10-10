import mysql=require("mysql2")

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "mini-blog-schema"
})