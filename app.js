require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const logger = require('./logger');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

let books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
  ];

app.get('/books', (req, res) => {
  res.status(200).json(books)
});

app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(book => book.id === bookId);

  if (!book) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    res.status(200).json(book);
  }
});

app.post('/books/:id',(req,res)=>{
  const newBook=req.body;
  newBook.id=books.length+1;
  books.push(newBook);
  res.status(200).send(newBook)
})

app.put('/books/:id',(req,res)=>{
  const bookId=parseInt(req.params.id)
  const updateBook=req.body;
  const index=books.findIndex(book=>book.id===bookId)

  if(index===-1){
    res.status(400).send("item not found")
  }else{
    books[index]={...books[index],...updateBook}
    res.status(200).send(books[index])
  }
})

app.delete('/books/:id',(req,res)=>{
  const bookId=parseInt(req.params.id)
  books=books.filter(book=>book.id!==bookId)
  res.status(204).send("Deleted")
})

app.listen(PORT, () => {
  logger.log(`Server is running at http://${HOST}:${PORT}`);
});
