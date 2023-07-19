const express = require("express")

const { users } = require("../data/users.json")
const router = express.Router()

/**
 * Route: /users
 * Method: GET
 * Description: This route is used for getting all the users
 * Access: Public
 * Parameters: None
 */
router.get("/", (request, response) => {
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

router.get("/:id", (request, response) => {
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

router.post("/", (request, response) => {
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

router.put("/:id", (request, response) => {
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

/**
 * Route: /users/id
 * Method: DELETE
 * Description: Delete the specified user
 * Access: Public
 * Parameters: id
 */

router.delete("/:id", (request, response) => {
    const { id } = request.params;
    const user = users.find((each) => each.id === id)
    if (!user) {
        return response.status(404).json({
            success: false,
            message: "User which need to be deleted does not exist"
        })
    }

    const index = users.indexOf(user)
    users.splice(index, 1)

    return response.status(202).json({
        success: true,
        message: "User deleted successfully",
        data: users
    })
})

// default export
module.exports = router