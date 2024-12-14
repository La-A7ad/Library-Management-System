const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const booksFilePath = path.join(__dirname, 'books.json');

/**
 * Utility function to read the JSON file
 */
function readBooksFile() {
  try {
    const data = fs.readFileSync(booksFilePath, 'utf-8');
    return JSON.parse(data || '[]'); // Handle empty file by returning an empty array
  } catch (err) {
    console.error('Error reading books file:', err);
    return []; // Return an empty array if file is missing or invalid
  }
}

/**
 * Utility function to write data to the JSON file
 */
function writeBooksFile(data) {
  try {
    fs.writeFileSync(booksFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to books file:', err);
  }
}

/**
 * Route to add a new book
 */
router.post('/books', (req, res) => {
  const { title, author, publishedYear, isbn, genre } = req.body;

  // Validate required fields
  if (!title || !author || !publishedYear || !isbn) {
    return res.status(400).json({ error: 'Missing required fields: title, author, publishedYear, isbn.' });
  }

  const books = readBooksFile();

  // Check if ISBN already exists
  if (books.find(book => book.isbn === isbn)) {
    return res.status(400).json({ error: 'A book with this ISBN already exists.' });
  }

  // Create a new book object
  const newBook = { title, author, publishedYear, isbn, genre: genre || '' };

  // Add the new book to the list
  books.push(newBook);

  // Write the updated list back to the file
  writeBooksFile(books);

  res.status(201).json(newBook);
});

/**
 * Route to get all books
 */
router.get('/books', (req, res) => {
  const books = readBooksFile();
  res.status(200).json(books);
});

/**
 * Route to search for books by author, published year, or genre
 */
router.get('/books/search', (req, res) => {
  const { author, publishedYear, genre } = req.query;
  let books = readBooksFile();

  if (author) {
    books = books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
  }
  if (publishedYear) {
    books = books.filter(book => book.publishedYear.toString() === publishedYear);
  }
  if (genre) {
    books = books.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
  }

  res.status(200).json(books);
});

/**
 * Route to delete a book by ISBN
 */
router.delete('/books/:isbn', (req, res) => {
  const { isbn } = req.params;

  let books = readBooksFile();
  const bookIndex = books.findIndex(book => book.isbn === isbn);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  // Remove the book from the list
  books.splice(bookIndex, 1);

  // Write the updated list back to the file
  writeBooksFile(books);

  res.status(200).json({ message: 'Book deleted successfully.' });
});

/**
 * Route to update book details by ISBN
 */
router.put('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { title, author, publishedYear, genre } = req.body;

  let books = readBooksFile();
  const bookIndex = books.findIndex(book => book.isbn === isbn);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  // Update fields if present in request body
  if (title !== undefined) books[bookIndex].title = title;
  if (author !== undefined) books[bookIndex].author = author;
  if (publishedYear !== undefined) books[bookIndex].publishedYear = parseInt(publishedYear, 10);
  if (genre !== undefined) books[bookIndex].genre = genre;

  // Write the updated list back to the file
  writeBooksFile(books);

  res.status(200).json(books[bookIndex]);
});

/**
 * Root route to display a welcome message
 */
router.get('/', (req, res) => {
  res.send('Welcome to the Library Management API! Use /books to manage books or /api-docs for Swagger documentation.');
});

module.exports = router;

