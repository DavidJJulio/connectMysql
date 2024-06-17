import mysql from 'mysql2/promise'


export const connection = await mysql.createConnection({
    host: "viaduct.proxy.rlwy.net",
    port: "18757",
    database: "railway",
    user: "root",
    password: "kKrKhNKPrzQnUcbeXVoUznlvfvEGvnCW"
})

