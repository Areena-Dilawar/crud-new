const express = require('express');
const app = express();
app.use(express.json());

let book = [
    {id:1, name: "It Start with us", year:2022, author:"Collen Hover"},
    {id:2, name: "It Ends with us", year:2016, author:"Collen Hover"},
    {id:3, name: "Learning to love myself", year:2023, author:"Alex Aubrey"},
]

app.listen(3000, () => {
    console.log("Server is running on 3000");
})

app.post("/create", (req, res)=>{
    const newBook =req.body
    book.push(newBook)
    res.json(book)
})

app.get("/read", (req, res) => {
    res.json(book);
});

//Return a single item by ID
app.get("/items/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const item = book.find(i => i.id === bookId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

//Return a single item by ID
app.get("/items/search", (req, res) => {
    const nameQuery = req.query.name;
    if(!nameQuery){
        return res.status(400).json({ message:"Name query parameter is required."});
    }
    const filteredItems = book.filter(books=>
        books.name.toLowerCase().includes(nameQuery.toLowerCase())
    )
    res.json(filteredItems);
});

