const express = require('express');
const connectDB = require('./db');
const Item = require('./schemas/item')
const PhoneInfo = require('./schemas/phone-info')
const Category = require('./schemas/category')
const app = express();
const cors = require('cors');
const validate = require('./api/number-validation')
const path = require('path');
require('dotenv').config();
const port = process.env.SERVER_PORT || 3001;

connectDB();

app.use(express.json());


const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200,
  };
  
app.use(cors(corsOptions));

// get all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find(); // Retrieve all documents from the collection
        res.status(200).json(items); // Send the items as a JSON response
    } catch (err) {
        res.status(500).send(err.message); // Handle errors
    }
});

// get item with id
app.get('/api/item/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate(['phone_info','category']);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// add item
app.post('/api/item', async (req, res) => {
    try {
        let item = req.body;
        let validation = await validate(item.phone_number)
        let phoneInfo = new PhoneInfo({
            country_code : validation.countryCode,
            country_name : validation.countryName,
            operator_name : validation.operatorName
        })
        await phoneInfo.save();
        item.phone_info = phoneInfo._id;
        const newItem = new Item(item);
        await newItem.save();
        res.status(200).send(newItem);
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message);
    }
});

// update item
app.post('/api/item/:id', async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(updatedItem);
});

// delete item
app.delete('/api/item/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const items = await Category.find(); 
        res.status(200).json(items);
    } catch (err) {
        res.status(500).send(err.message); // Handle errors
    }
});

// add category
app.post('/api/category', async (req, res) => {
    try {
        let category = {name : req.body.name}
        const newCategory = new Category(category);
        await newCategory.save();
        res.status(200).send(newCategory);
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message);
    }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;