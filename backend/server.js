const internalIp = require('internal-ip')
const logger = require('morgan')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const multiparty = require('multiparty')
const AWS = require('aws-sdk')
const bluebird = require('bluebird')
const fileType = require('file-type')
const fs = require('fs')

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

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);


// create S3 instance
const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

app.post('/ads', (req,res) => {
  const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      console.log(files)
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = await fileType.fromBuffer(buffer);
        const fileName = `${files.file[0].originalFilename.split('.')[0]}`;
        const data = await uploadFile(buffer, fileName, type);
        return res.status(200).send(data);
      } catch (error) {
        console.log(error)
        return res.status(400).send(error);
      }
    });
})

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server running at http://${internalIp.v4.sync()}:${port}/`)