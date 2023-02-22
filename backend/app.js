const express = require("express");
require("./db");
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000; 
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.use(express.json())
app.use('/api', require('./Routers/Res'));
app.use('/api', require('./Routers/Details'));


app.listen(port, () => {
    console.log(`connection is setup at localhost:${port}`)
});