const express = require('express');
const { books } = require("../data/books.json")
const { users } = require("../data/users.json")
const { getAllBooks, getSingleBooksById, getAllIssuedBooks } = require("../controllers/book-contoller")
const router = express.Router();

// const BookModel = require("../models/book-model")
// const UserModel = require("../models/user-model")
// above is done in just one line
const { UserModel, BookModel } = require("../models/index");
const { get } = require('mongoose');
// const BookModel = require("../models/index")
// const UserModel = require("../models/index")

/**
 * Route: /books
 * Method: GET
 * Description: This route is used for getting all the books
 * Access: Public
 * Parameters: None
 */
router.get("/", getAllBooks)


/**
 * Route: /books/id
 * Method: GET
 * Description: This route is used for getting specific book
 * Access: Public
 * Parameters: None
 */
router.get("/:id", getSingleBooksById)


/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: This route is used for getting all the books issued by users
 * Access: Public
 * Parameters: None
 */

router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description: This route is used for creating new book
 * Access: Public
 * Parameters: None
 * data: name,author,genre,publisher,id
 */

router.post("/", (request, response) => {
  const { data } = request.body
  if (!data) return response.status(400).json({
    success: false,
    message: "Data is not provided by user"
  })

  const book = books.find((each) => each.id === data.id);
  if (book) return response.status(401).json({ success: false, message: "Book already exist with this id, please unique id" })

  // const allBooks = [...books, ...data]
  books.push({ data })
  return response.status(200).json({
    success: true,
    message: "Book successfully added",
    data: books
  })

})


/**
 * Route: /books/:id
 * Method: PUT
 * Description: This route is used for updating details of the book
 * Access: Public
 * Parameters: id
 * data: name,author,genre,publisher,id
 */

router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { data } = request.body
  const book = books.find((each) => each.id === id)
  if (!book) return response.status(404).json({ success: false, message: "Book is not present with the particular id" })
  const updateData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
  return response.status(200).json({
    success: true,
    message: "Book details updated successfully",
    data: updateData
  })

})

module.exports = router;