const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { protect, adminProtect } = require("../middlewares/authMiddleware");
const Book = require("../models/bookModel");
const { body } = require("express-validator");

router
  .route("/")
  .get(getBooks)
  .post(
    protect,
    [
      body("title").notEmpty().withMessage("Название обязательно"),
      body("author").notEmpty().withMessage("Автор обязателен"),
      body("description")
        .isLength({ min: 10 })
        .withMessage("Описание должно быть минимум 10 символов"),
      body("genre").isIn(Book.schema.path("genre").enumValues),
    ],
    adminProtect,
    addBook
  );

router
  .route("/:id")
  .get(getBookById)
  .put(
    protect,
    adminProtect,
    [
      body("title").notEmpty().withMessage("Название обязательно"),
      body("author").notEmpty().withMessage("Автор обязателен"),
      body("description")
        .isLength({ min: 10 })
        .withMessage("Описание должно быть минимум 10 символов"),
      body("genre").isIn(Book.schema.path("genre").enumValues),
    ],
    updateBook
  )
  .delete(protect, adminProtect, deleteBook);

module.exports = router;
