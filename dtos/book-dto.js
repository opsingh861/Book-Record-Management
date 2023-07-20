class IssuedBook {
    _id;
    name;
    genre;
    price;
    publisher;
    issuedby;
    issuedDate;
    returnDate;

    constructor(user) {
        this.id = user.issuedBook.id;
        this.name = user.issuedBook.name
        this.genre = user.issuedBook.genre
        this.price = user.issuedBook.price
        this.publisher = user.issuedBook.publisher
        this.publisher = user.issuedBook.publisher
        this.issuedby = user.name
        this.issuedDate = user.issuedDate
        this.returnDate = user.returnDate
    }
}

module.exports = IssuedBook;