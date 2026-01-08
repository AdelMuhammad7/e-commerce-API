import multer from "multer"
import { ApiError } from "./globalErrorHandler.js"

// multer options
const multerOptions = () => {
    const multerFilter = function (req , file , cb) {
        if(file.mimetype.startsWith("image")){
            cb(null , true)
        }else {
            cb(new ApiError("Only image is allowed" , 404) , false)
        }
    }
    // 2- Memory Storage
    const multerStorage = multer.memoryStorage()
    const upload = multer({ storage :multerStorage , fileFilter : multerFilter })

    return upload
}

// upload single image
export const uploadSingleImage = (fieldName) => multerOptions().single(fieldName)

// upload mix of images
export const uploadMixOfImages = (arrayOfFileds)=> multerOptions().fields(arrayOfFileds)