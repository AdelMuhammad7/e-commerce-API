import path from "path"
import { fileURLToPath } from "url";

import express from "express"
import dotenv from "dotenv"

import { databaseConnection } from "./src/config/db.js"
import { loggerWithMorgan } from "./src/config/logger.js"

import { router as categoryRoute } from "./src/modules/Categories/categoryRoutes.js"
import { router as subCategoryRoute } from "./src/modules/SubCategories/subCategoryRoutes.js"
import { router as BrandRoute } from "./src/modules/Brands/BrandRoutes.js"
import { router as AttributeRoutes } from "./src/modules/Attributes/attributeRoutes.js"
import { router as ProductRoutes } from "./src/modules/Products/productRoutes.js"
import { router as UserRoutes } from "./src/modules/Users/UserServices/userRoute.js"
import { router as AuthRoutes } from "./src/modules/Users/AuthServices/authRoutes.js"
import { router as AttributeValuesRoutes } from "./src/modules/AttributesValues/AttributeValuesRoutes.js"
import { ApiError, errorHandler } from "./src/middleware/globalErrorHandler.js"


// .env
dotenv.config({ path: "config.env" })

// connect with database
databaseConnection()

// dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// express app
const app = express()

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> middelwares
// >>>>>>>>>>>> morgan
loggerWithMorgan(app)
// >>>>>>>>>>>> to read body
app.use(express.json())
// to make folder uploads is serve to application
app.use(express.static(path.join(__dirname , "uploads")))

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Mount routes
app.use("/api/v1/categories" , categoryRoute)
app.use("/api/v1/subcategories" , subCategoryRoute)
app.use("/api/v1/brands" , BrandRoute)
app.use("/api/v1/attributes" , AttributeRoutes)
app.use("/api/v1/attributeValues" , AttributeValuesRoutes)
app.use("/api/v1/products" , ProductRoutes)
app.use("/api/v1/users" , UserRoutes)
app.use("/api/v1/auth" , AuthRoutes)

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