const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();
let path = require("path");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

app.locals.basePath = path.join(__dirname, 'public', 'bilder')

const pdfRoutes = require('./routes/pdfcreator.routes')
const bwRoutes = require('./routes/bewerbungen.routes')

app.use('/api/v1/pdf', pdfRoutes)
app.use('/api/v1/bewerbungen', bwRoutes)

app.set('view engine', 'ejs');

mongoose.connect(process.env.DB_URI, {
    dbName: 'bewerbungen',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : console.log('Connected to database'));

app.listen(5000);
console.log("Server running on Port 5000");