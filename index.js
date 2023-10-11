const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const body_parser = require('body-parser')
const cors = require('cors')
const Book = require("./Models/Books");
const startController = require("./Controllers/StartController");
let requestNum = 1;

//Connect to db
mongoose.connect(config.mongoDBurl, {useNewUrlParser : true})

const db = mongoose.connection
db.once('open', () => {
    console.log(`Database connection successful!\n\t\t-----------------------------\n`)
})
db.on('error', err => {
    console.log(`Database connection error : ${err}`)
})


const app = express();
app.use(cors())

app.use((req, res, next) => {
  console.log(
    `Request Received,\nMETHOD : ${req.method}\nPATH : ${req.path}\nRequest Number : ${requestNum}__________________________\n`
  );
  requestNum += 1;
  next();
});
app.use(body_parser.json())

app.get("/", (req, res) => {
  res.status(234).send("XAI");
});

app.get("/test", (req, res) => {
  res.json({
    status: 200,
    message: "We are live.",
  });
});

app.post('/addbook',(req,res) => {
  let newBook = {}
  if(req.body.hasOwnProperty('title') && req.body.hasOwnProperty('author') && req.body.hasOwnProperty('isbn') && req.body.hasOwnProperty('genre')){
    newBook.title = req.body.title
    newBook.isbn = req.body.isbn
    newBook.author = req.body.author
    newBook.genre = req.body.genre
    let book = new Book(newBook)
    book.save().then(() => console.log("Book saved.")).catch((err) => console.log(`Error saving book : ${err}`))
    
  }
  else{
   return res.status(400).send("Failed!") 
  }

})

app.get('/start', startController)

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}.`);
});
