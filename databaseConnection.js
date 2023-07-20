const mongoose = require('mongoose');

function DbConnection() {
    const url = process.env.MONGO_URI;
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "Connection error: "))

    db.once("open", function () {
        console.log("Db connected...")
    })
}

module.exports = DbConnection;