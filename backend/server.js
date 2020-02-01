const internalIp = require('internal-ip');
const logger = require('morgan');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../build')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/ping', (req, res) => {
 return res.send('pong');
});

app.get('/ads', (req,res) => {

});

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'))
})

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server running at http://${internalIp.v4.sync()}:${port}/`);