const express = require("express")

const { users } = require("./data/users.json")

const app = express()

const PORT = 8081

app.use(express.json())

app.get("/", (request, response) => {
    response.status(200).json({
        message: "Server is up and running"
    })
})

/**
 * Route: /users
 * Method: GET
 * Description: This route is used for getting all the users
 * Access: Public
 * Parameters: None
 */
app.get("/users", (request, response) => {
    response.status(200).json({
        success: true,
        data: users
    })
})

/**
 * Route: /users/{id}
 * Method: GET
 * Description: This route is used for getting a single user
 * Access: Public
 * Parameters: id
 */

app.get("/users/:id", (request, response) => {
    const { id } = request.params
    const user = users.find((each) => each.id === id)
    if (!user) {
        return response.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    return response.status(200).json({
        success: true,
        data: user
    })
})

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: none
 */

app.post("/users", (request, response) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = request.body
    const user = users.find((each) => each.id === id)
    if (user) {
        return response.status(404).json({
            success: false,
            message: "User exists with this id"
        })
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })

    return response.status(200).json({
        success: true,
        message: "User created successfully",
        data: users
    })
})


/**
 * Route: /users/id
 * Method: PUT
 * Description: Update the details of specified user
 * Access: Public
 * Parameters: id
 */

app.put("/users/:id", (request, response) => {
    const { id } = request.params
    const { data } = request.body

    const user = users.find((each) => each.id === id)

    if (!user) {
        return response.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    const updatedUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data
            }
        }
        return each;
    })
    return response.status(200).json({
        success: true,
        message: "User's details updated successfully",
        updatedUser
    })
})



app.get("*", (request, response) => {
    response.status(404).json({
        message: "This route does not exist"
    })
})

app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`)
})