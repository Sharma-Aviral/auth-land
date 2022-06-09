require('dotenv').config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

require('./db')();

const app = express();

var corsOptions = { origin: '*' };

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// route import
const auth = require('./routes/auth');

const verify = require('./routes/verify');

app.get('/', (req, res) => {res.send("Auth land, version:- 1")});

app.use('/api/auth', auth);

app.use('/api/verify', verify);

// server running
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`API service running on PORT : ${port}`);
});