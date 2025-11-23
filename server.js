import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
dotenv.config({ path: "config.env" })
import mongoose from "mongoose"


// connect with DB
mongoose.connect(process.env.DB_URI).then((conn)=> {
    console.log(`DataBase Connected Successfully on host: ${conn.connection.host}`)
}).catch((err)=> {
    console.log(`DataBase Error: ${err}`)
    process.exit(1);
})


// express app
const app = express()

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> middelwares

app.use(express.json())

if(process.env.NODE_ENV == "development"){
    app.use(morgan("dev"))
    console.log(`Mode is >>> ${process.env.NODE_ENV}`)
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> schema
// >>>>>> 1- create schema
const categorySchema = new mongoose.Schema({
    name: String
})

// >>>>> 2- create model >>> this model can do CRUD operations 
const CategoryModel = mongoose.model('Category', categorySchema);



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> routes
app.post("/" , (req ,res) => {
    const name = req.body.name

    const newCategory = new CategoryModel({ name })
    newCategory.save().then((doc) => {
        console.log(doc)
        res.json(doc)
    }).catch((error)=> {
        res.json(error)
    })
})



app.get("/" , (req , res)=> {
    res.send("api is correct")
})


// running the app
const PORT = process.env.PORT
app.listen(PORT , () => {
    console.log(`App Running on port >>> ${PORT}`)
})