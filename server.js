import express from "express"
import dotenv from "dotenv"
import { databaseConnection } from "./src/config/db.js"
import { loggerWithMorgan } from "./src/config/logger.js"

import { router as categoryRoute } from "./src/modules/Categories/categoryRoutes.js"
import { router as subCategoryRoute } from "./src/modules/SubCategories/subCategoryRoutes.js"
import { router as BrandRoute } from "./src/modules/Brands/BrandRoutes.js"
import { ApiError, errorHandler } from "./src/middleware/globalErrorHandler.js"


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
app.use("/api/v1/subcategories" , subCategoryRoute)
app.use("/api/v1/brands" , BrandRoute)

// if not found route
app.use( (req , res , next)=> {
    next(ApiError(`can't find this route ${req.originalUrl}` , 404))
})

errorHandler(app)

// running the app
const PORT = process.env.PORT
const server = app.listen(PORT , () => {
    console.log(`App Running on port >>> ${PORT}`)
})


// unhandeled rejection error
process.on('unhandledRejection' , (err) => {
    console.error(`Unhandled Rejection Error >>>> ${err}`)
    // here >> if any api requests , >>> wait for completing it and shut down
    server.close(()=> {
        console.error(`app is shutting down`)
        process.exit(1)
    })
})