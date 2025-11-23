import morgan from "morgan"

export function loggerWithMorgan (app) {
    if(process.env.NODE_ENV == "development"){
        app.use(morgan("dev"))
        console.log(`Mode is >>> ${process.env.NODE_ENV}`)
    }
}