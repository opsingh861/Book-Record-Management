const express = require('express');
const { books } = require("../data/books.json")
const { users } = require("../data/users.json")
const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: This route is used for getting all the books
 * Access: Public
 * Parameters: None
 */
router.get("/", (request, response) => {
  response.status(200).json({
    success: true,
    data: books
  })
})


/**
 * Route: /books/id
 * Method: GET
 * Description: This route is used for getting specific book
 * Access: Public
 * Parameters: None
 */
router.get("/:id", (request, response) => {
  const { id } = request.params;
  const book = books.find(book => book.id === id);

  if (!book) {
    return response.status(404).json({
      success: false,
      message: "Book not found"
    })
  }

  return response.status(200).json({
    success: true,
    data: book
  })
})


/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: This route is used for getting all the books issued by users
 * Access: Public
 * Parameters: None
 */

router.get("/issued/by-user", (request, response) => {
  const usersWithIssuedBooks = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];

  usersWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });

  if (issuedBooks.length === 0)
    return response.status(404).json({
      success: false,
      message: "No books issued yet",
    });

  return response.status(200).json({
    success: true,
    data: issuedBooks,
  });
});

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