import qs from "qs"

class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    filter() {
        const queryStringObj = qs.parse(this.queryString)

        const excludesFields = ["page", "limit", "sort", "fields", "keyword"]
        excludesFields.forEach(field => delete queryStringObj[field])

        let queryStr = JSON.stringify(queryStringObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr))
        return this
    }

    search(modelName) {
        if (this.queryString.keyword) {
            let keywordQuery = {}
            if(modelName == "Products" || modelName == "attributeValues") {
                keywordQuery = {
                    $or: [
                        { title: { $regex: this.queryString.keyword, $options: "i" } },
                        { arTitle: { $regex: this.queryString.keyword, $options: "i" } },
                        { description: { $regex: this.queryString.keyword, $options: "i" } }
                    ]
                }
            }else {
                keywordQuery = {
                    $or: [
                        { name: { $regex: this.queryString.keyword, $options: "i" } },
                        { arName: { $regex: this.queryString.keyword, $options: "i" } },
                    ]
                }
            }

            this.mongooseQuery = this.mongooseQuery.find(keywordQuery)
        }
        return this
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ")
            this.mongooseQuery = this.mongooseQuery.sort(sortBy)
        } else {
            this.mongooseQuery = this.mongooseQuery.sort("-createdAt")
        }
        return this
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ")
            this.mongooseQuery = this.mongooseQuery.select(fields)
        }
        return this
    }

    paginate(countDocuments) {
        const page = Number(this.queryString.page) || 1
        const limit = Number(this.queryString.limit) || 50
        const skip = (page - 1) * limit

        const totalPages = Math.ceil(countDocuments / limit)

        const endIndex = page * limit

        const pagination = {}

        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.totalItems = countDocuments;
        pagination.totalPages = totalPages;
        // next page
        if(endIndex < countDocuments) {
            pagination.next = page + 1
        }
        // previous page
        if(skip > 0) {
            pagination.prev = page - 1
        }

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit)
        this.paginationResult = pagination
        return this
    }

}

export default ApiFeatures
