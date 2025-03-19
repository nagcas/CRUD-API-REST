// Verifico se il nio script è collegato correttamente al document html
console.log("It' working...");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const bookRoutes = require("./routes/book.routes");
const endpoints = require("express-list-endpoints");

config();

// usuamo express per i middleweare
const app = express();
app.use(bodyParser.json()); // parser del body

// connettiamo il database mongodb
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
    .then(() => console.log("MongoDB connesso"))
    .catch((error) => console.error(error.message))

app.use("/books", bookRoutes);

const PORT = process.env.PORT || 3000;

try {
    app.listen(PORT, () => {
        console.clear();
        console.log(`Server avviato alla porta ${PORT}`);
        console.log("%c" + "Per chiudere il server ctrl-c", "color: #f0f");
        console.table(endpoints(app));
    });
} catch (error) {
    console.log(error.message);
}