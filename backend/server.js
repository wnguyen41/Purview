const internalIp = require('internal-ip')
const logger = require('morgan')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../build')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

// Anything that doesn't match the above, send back index.html
app.get('/camera', (req, res) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    res.sendFile(path.join(__dirname + '/../public/camera.html'))
  }
  else {
    res.sendFile(path.join(__dirname + '/../build/camera.html'))
  }
})

app.get('/camera-assets/:asset_name', (req, res) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    res.sendFile(path.join(__dirname + '/../public/' + req.params.asset_name)) // EDIT LATER FOR PRODUCTION
  }
  else {
    res.sendFile(path.join(__dirname + '/../build/' + req.params.asset_name))
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'))
})

app.get('/ads', (req,res) => {

})

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server running at http://${internalIp.v4.sync()}:${port}/`)