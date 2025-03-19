// Verifico se il nio script è collegato correttamente al document html
console.log("It' working...");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const bookRoutes = require("./routes/book.routes");

config();

// usuamo express per i middleweare
const app = express();
app.use(bodyParser.json()); // parser del body

// connettiamo il database mongodb
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
const db = mongoose.connection;

app.use("/books", bookRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server avviato alla porta ${port}`);
});