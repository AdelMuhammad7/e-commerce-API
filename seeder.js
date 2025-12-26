import fs from "fs"
import "colors"
import dotenv from "dotenv"
import { databaseConnection } from "./src/config/db.js"
import { ProductModel } from "./src/modules/Products/ProductModel.js"

// .env
dotenv.config({ path: "config.env" })


databaseConnection()


// read data
const productData = JSON.parse(fs.readFileSync("./src/utils/ProductsData.json"))


// insert Data in DB
const insertData = async ()=> {
    try {
        await ProductModel.create(productData)
        console.log(`data inserted` .green.inverse)
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

const destroyData = async ()=> {
    try {
        await ProductModel.deleteMany()
        console.log(`data destroyed` .red.inverse)
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

// node seeder.js -i || -d
if (process.argv[2] === "-i") {
    insertData()
} else if (process.argv[2] === "-d") {
    destroyData()
}