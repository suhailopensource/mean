const express = require('express');
const app = express();
const port = 3000;

// Mock book data
const books = [
    { id: 1, title: 'Bob the robber', author: 'lavanya', price: 10, imageUrl: 'book1.jpg' },
    { id: 2, title: 'Chronicles of crecent', author: 'Suhail', price: 10, imageUrl: 'book1.jpg' },
    { id: 3, title: 'i am stupid', author: 'Sanjay', price: 10, imageUrl: 'book1.jpg' },
    { id: 3, title: 'Vadakkan life', author: 'Rishika', price: 10, imageUrl: 'book1.jpg' },
    // ... other books
];

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.post('/api/cart', (req, res) => {
    // Add item to cart in database
    res.json({ message: 'Item added to cart' });
});

app.post('/api/checkout', (req, res) => {
    // Process checkout, e.g., send order confirmation email
    res.json({ message: 'Checkout successful' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
