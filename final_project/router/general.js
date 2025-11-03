const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
   res.send(JSON.stringify(books, null, 4));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
 const isbn = req.params.isbn;
  res.send(books[isbn] ? books[isbn] : "Book not found");
    return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let matchingBooks = [];
  
    Object.keys(books).forEach(key => {
      if (books[key].author === author) {
        matchingBooks.push(books[key]);
      }
    });
  
    res.send(matchingBooks.length ? matchingBooks : "No books found for this author");
  });
  

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let matchingBooks = [];
  
    Object.keys(books).forEach(key => {
      if (books[key].title === title) {
        matchingBooks.push(books[key]);
      }
    });
  
    res.send(matchingBooks.length ? matchingBooks : "No books found with this title");
  });
  

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn] ? books[isbn].reviews : "No reviews for this book");
  });
  
// -------------------------
// TASK 10–13 (Async/Await)
// -------------------------

// Task 10 – Get all books (Async version)
public_users.get('/async/books', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:5000/');
      res.send(response.data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Task 11 – Get book by ISBN (Async version)
  public_users.get('/async/isbn/:isbn', async (req, res) => {
    try {
      const isbn = req.params.isbn;
      const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
      res.send(response.data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Task 12 – Get book by author (Async version)
  public_users.get('/async/author/:author', async (req, res) => {
    try {
      const author = req.params.author;
      const response = await axios.get(`http://localhost:5000/author/${author}`);
      res.send(response.data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Task 13 – Get book by title (Async version)
  public_users.get('/async/title/:title', async (req, res) => {
    try {
      const title = req.params.title;
      const response = await axios.get(`http://localhost:5000/title/${title}`);
      res.send(response.data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  
module.exports.general = public_users;
