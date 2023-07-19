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




module.exports = router;