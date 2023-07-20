// const { BookModel, UserModel } = require("../models/index")
const { BookModel } = require("../models");
const UserModel = require("../models/user-model")
const IssuedBook = require("../dtos/book-dto")

exports.getAllBooks = async (request, response) => {
    const books = await BookModel.find();

    if (books.length === 0) {
        return response.status(404).json({
            success: false,
            message: "No book found"
        })
    }

    response.status(200).json({
        success: true,
        data: books
    })
}

exports.getSingleBooksById = async (request, response) => {
    const { id } = request.params;

    const book = await BookModel.findById(id);

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
}

exports.getAllIssuedBooks = async (request, response) => {
    const users = await UserModel.find({
        issuedBook: { $exists: true }
    }).populate("issuedBook")

    const issuedBooks = users.map((each) => new IssuedBook(each));

    if (issuedBooks.length == 0) {
        return response.status(404).json({
            success: false,
            message: "No books issued yet"
        })
    }

    return response.status(200).json({
        success: true,
        data: issuedBooks
    })
}


exports.addNewBook = async (request, response) => {
    const { data } = request.body
    if (!data) {
        response.status(404).json({
            success: false,
            message: "Data is not provided by user"
        })
    }

    await BookModel.create(data);

    const allBooks = await BookModel.find();
    return response.status(404).json({
        success: true,
        data: allBooks
    })
}


exports.updateBookById = async (request, response) => {
    const { data } = request.body

    const udpatedBook = await BookModel.findOneAndUpdate({
        _id: id
    },
        data, {
        new: true
    }
    )

    return response.status(200).json({
        success: true,
        data: udpatedBook
    })
}