import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({ path: "config.env" })

const URI = process.env.DB_URI

// connect with DB
export function databaseConnection () {
    mongoose.connect(URI)
        .then((conn)=> {
            console.log(`DataBase Connected Successfully on host: ${conn.connection.host}`)
        })

// handled all error in server.js

        // .catch((err)=> {
        //     console.log(`DataBase Error: ${err}`)
        //     process.exit(1);
        // })
}