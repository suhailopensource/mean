const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize the app
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/finance-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define the schema for income and expense
const financeSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    category: String,
    type: { type: String, enum: ['income', 'expense'], required: true },
    date: { type: Date, default: Date.now }
});

const Finance = mongoose.model('Finance', financeSchema);

// API routes

// Get all records
app.get('/api/records', async (req, res) => {
    try {
        const records = await Finance.find();
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new record (income or expense)
app.post('/api/records', async (req, res) => {
    const { description, amount, category, type } = req.body;

    const newRecord = new Finance({ description, amount, category, type });

    try {
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a record
app.put('/api/records/:id', async (req, res) => {
    const { description, amount, category, type } = req.body;
    try {
        const updatedRecord = await Finance.findByIdAndUpdate(req.params.id, { description, amount, category, type }, { new: true });
        res.json(updatedRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a record
app.delete('/api/records/:id', async (req, res) => {
    try {
        await Finance.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
