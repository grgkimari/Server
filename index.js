const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const Books = require("./Models/Books");
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

const showAllBooks = async () => {
  const BookList = await Books.find() 
  console.log(`BookList of length ${BookList.length}\n`)
  BookList.map((item) => JSON.stringify(item))
}
showAllBooks()

const app = express();
console.log(JSON.stringify(config));

app.use((req, res, next) => {
  console.log(
    `Request Received,\nMETHOD : ${req.method}\nPATH : ${req.path}\nRequest Number : ${requestNum}__________________________\n`
  );
  requestNum += 1;
  next();
});

app.get("/", (req, res) => {
  res.status(234).send("XAI");
});

app.get("/test", (req, res) => {
  res.json({
    status: 200,
    message: "We are live.",
  });
});

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}.`);
});
