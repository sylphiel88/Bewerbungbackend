const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
let path = require("path");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

app.locals.basePath = path.join(__dirname, 'public', 'bilder')

const pdfRoutes = require('./routes/pdfcreator.routes')

app.use('/api/v1/pdf', pdfRoutes)

app.set('view engine', 'ejs');

app.listen(5000);
console.log("Server running on Port 5000");