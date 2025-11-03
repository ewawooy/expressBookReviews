const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
return users.some(user => user.username === username && user.password === password);
}

//register
regd_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    if (doesExist(username)) {
      return res.status(400).json({ message: "User already exists" });
    }
    users.push({ username, password });
    return res.status(200).json({ message: "User registered successfully" });
  });
  

//only registered users can login
const jwt = require("jsonwebtoken");
const secretKey = "fingerprint_customer";

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  let accessToken = jwt.sign({ data: username }, secretKey, { expiresIn: 60 * 60 });
  req.session.authorization = { accessToken, username };
  return res.status(200).json({ message: "Login successful", token: accessToken });
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization.username;
  
    if (!books[isbn]) return res.status(404).json({ message: "Book not found" });
  
    books[isbn].reviews[username] = review;
    return res.status(200).json({ message: "Review added/updated successfully", reviews: books[isbn].reviews });
  });
  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
