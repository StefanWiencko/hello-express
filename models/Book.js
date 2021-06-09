const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      requireq: true,
    },
    ISBN: {
      type: String,
      requireq: true,
    },
    quanity: {
      type: Number,
      requireq: true,
    },
    description: {
      type: String,
      requireq: true,
    },
  },
  { timestamps: true }
);

const Book = model("Book", bookSchema);

module.exports = Book;
