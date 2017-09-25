const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// mongoose.connect('mongodb://localhost:bucket/bucket');
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds149974.mlab.com:49974/bucketl');
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));
router(app);

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
console.log('Server listening on ' + port);