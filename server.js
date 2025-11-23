import express from "express"
import dotenv from "dotenv"
import { databaseConnection } from "./src/config/db.js"
import { loggerWithMorgan } from "./src/config/logger.js"

import { router as categoryRoute } from "./src/modules/Categories/categoryRoutes.js"

// .env
dotenv.config({ path: "config.env" })

// connect with database
databaseConnection()

// express app
const app = express()

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> middelwares
// >>>>>>>>>>>> morgan
loggerWithMorgan(app)
// >>>>>>>>>>>> to read body
app.use(express.json())

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Mount routes
app.use("/api/v1/categories" , categoryRoute)


// running the app
const PORT = process.env.PORT
app.listen(PORT , () => {
    console.log(`App Running on port >>> ${PORT}`)
})