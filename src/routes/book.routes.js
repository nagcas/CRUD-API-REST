const express = require("express");
const Book = require("../models/book.model");

const router = express.Router()

//MIDDLEWARE
const getBook = async(req, res, next) => {
    let book;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json(
            { 
                message: "L'id del libro non e' stato trovato!" 
            }
        );
    };

    try {
        book = await Book.findById(id);
        if (!book) {
            return res.status(404).json(
                {
                    message: "Il libro non e' stato trovato"
                }
            );
        };
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    };

    res.book = book;
    next();
};

// ottenere tutti i libri [GET ALL]
router.get("/", async(req, res) => {
    try {
        const books = await Book.find(); // cera tutti i libri
        console.log("GET ALL", books);
        if (books.length === 0) {
            return res.status(204).json([]);
        }
        res.json(books);
    } catch (error) {
        res.status(500).json(
            { 
                message: error.message
            }
        );
    };
});

// rotta per creare un nuovo libro [POST]
router.post("/", async (req, res) => {
    const { title, author, genre, publication_date } = req?.body;
    if (!title || !author || !genre || !publication_date) {
        return res.status(400).json(
            { 
                message: "I campi del titolo, autore. genere e anno di pubblicazione sono obbligatori" 
            }
        );
    };

    const book = new Book (
        {
            title,
            author,
            genre,
            publication_date,
        }
    );

    try {
        const newBook = await book.save();
        console.log(newBook);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json(
            { 
                message: error.message 
            }
        );
    };
});

// rotta con params id per visualizzare un singolo libro [GET:id]
router.get("/:id", getBook, async(req, res) => {
    res.json(res.book);
});

// rotta con params id per modificare un singolo libro [PUT:id]
router.put("/:id", getBook, async(req, res) => {
    try {
        const book = res.book;
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publication_date = req.body.publication_date || book.publication_date;

        const updateBook = await book.save();
        res.json(updateBook);

    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        );
    };
});

// rotta con params id per modificare un singolo libro [PATCH:id]
router.patch("/:id", getBook, async(req, res) => {

    if (!req.body.title && !req.body.author && !req.body.genre && !req.body.publication_date) {
        res.status(400).json(
            {
                mesage: "Almeno un campo deve essere inviato: Titolo, Autore, Genere o data di pubblicazione!"
            }
        );
    };

    try {
        const book = res.book;
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publication_date = req.body.publication_date || book.publication_date;

        const updateBook = await book.save();
        res.json(updateBook);

    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        );
    };
});

// rotta con params id per eliminare un singolo libro [DELETE:id]
router.delete("/:id", getBook, async(req, res) => {
    try {
        const book = res.book;
        await book.deleteOne({
            _id: book._id
        });
        res.json(
            {
                message: "Book eliminato correttamente"
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                message: error.message
            }
        );
    };
});

module.exports = router;