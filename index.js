const express = require("express")

const { users } = require("./data/users.json")

// importing routes
const userRouter = require("./routes/users")
const bookRouter = require("./routes/books")

const app = express()

const PORT = 8081

app.use(express.json())

app.get("/", (request, response) => {
    response.status(200).json({
        message: "Server is up and running"
    })
})
// redirecting /users routes to userRouter
app.use("/users", userRouter);
app.use("/books", bookRouter)


app.get("*", (request, response) => {
    response.status(404).json({
        message: "This route does not exist"
    })
})

app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`)
})