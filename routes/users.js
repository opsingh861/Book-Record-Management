const express = require("express")

const { getAllUsers, getUserById, addNewUser, updateUserById, deleteUser, getUserSubscriptionDetail } = require("../controllers/user-controller")
const router = express.Router()

/**
 * Route: /users
 * Method: GET
 * Description: This route is used for getting all the users
 * Access: Public
 * Parameters: None
 */
router.get("/", getAllUsers)

/**
 * Route: /users/{id}
 * Method: GET
 * Description: This route is used for getting a single user
 * Access: Public
 * Parameters: id
 */

router.get("/:id", getUserById)

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: none
 */

router.post("/", addNewUser)


/**
 * Route: /users/id
 * Method: PUT
 * Description: Update the details of specified user
 * Access: Public
 * Parameters: id
 */

router.put("/:id", updateUserById)

/**
 * Route: /users/id
 * Method: DELETE
 * Description: Delete the specified user
 * Access: Public
 * Parameters: id
 */

router.delete("/:id", deleteUser)


/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all user subscription details
 * Access: Public
 * Parameters: id
 */

router.get("/subscription-details/:id", getUserSubscriptionDetail)




// default export
module.exports = router