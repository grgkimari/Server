const Book = require("../Models/Books");

const fetchStartBooks = async () => {
  try {
    const books = await Book.find().limit(15).exec();
    return books;
  } catch (err) {
    console.log(err);
    throw err; 
  }
};

const startController = async (req, res) => {
  try {
    const firstFiveBooks = await fetchStartBooks();
    res.json(firstFiveBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = startController;
