const { Router } = require("express");
const Book = require("../models/Book");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
});
router.get("/book/:bookId", async (req, res, next) => {
  try {
    const book = await Book.find({ _id: req.params.bookId });
    res.json(book);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const newBook = new Book(req.body);
    const createdBook = await newBook.save();
    res.json(createdBook);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

router.put("/book/:operation/:bookId", async (req, res, next) => {
  try {
    console.log(req.params.operation);
    const id = { _id: req.params.bookId };
    if (req.params.operation === "borrow") {
      const updatedBook = await Book.findOneAndUpdate(id, {
        quanity: req.body.quanity - 1,
      });
      res.json(updatedBook);
    } else if (req.params.operation === "return") {
      const updatedBook = await Book.findOneAndUpdate(id, {
        quanity: req.body.quanity + 1,
      });
      res.json(updatedBook);
    } else {
      res.status(400);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/book/:bookId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
