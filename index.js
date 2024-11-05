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

app.post("/create", (req, res) => {
    const { name, year, author } = req.body;
    if (!name || !year || !author) {
        return res.status(400).json({ message: "Name, year, and author are required." });
    }
    const newBook = {
        id: book.length ? book[book.length - 1].id + 1 : 1, 
        name,
        year,
        author,
    };
    book.push(newBook);
    res.status(201).json({ message: "Book added successfully", newBook });
});

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

app.put("/update/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedData = req.body;
    const bookIndex = book.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        if (updatedData.name) book[bookIndex].name = updatedData.name;
        if (updatedData.year) book[bookIndex].year = updatedData.year;
        if (updatedData.author) book[bookIndex].author = updatedData.author;

        res.json(book[bookIndex]);
    } else {
        res.status(404).json({ message: "Book not found" }); 
    }
});

app.delete("/delete/:id", (req, res) => {
    const bookId = parseInt(req.params.id); 
    const bookIndex = book.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        const deletedBook = book.splice(bookIndex, 1);
        res.json({ message: "Book deleted successfully", deletedBook });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});