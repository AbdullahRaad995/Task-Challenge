const express = require('express');
const getInfo = require('./number-info');
const app = express();
require('dotenv').config();
const port = process.env.SERVER_PORT || 3000;

app.get('/validate', async (req, res) => {
    let phoneNumber = req.query.number;
    try{
        let phoneInfo = await getInfo(phoneNumber);
        res.send(phoneInfo)
    } catch(err){
        res.status(400).send(err.message)
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});