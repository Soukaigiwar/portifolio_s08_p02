require("express-async-errors")

const AppError = require("./utils/AppError")
const { request } = require("express")
const express = require("express")
//const migrationsRun = require("./database/sqlite/migrations")

//migrationsRun()

const routes = require("./routes")

const app = express()
app.use(express.json())

app.use(routes)

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))