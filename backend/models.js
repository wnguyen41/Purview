const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://purview:secretpassword@purview-mdb-tp4sv.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


// Mongoose Connection
// if (!process.env.MONGODB_URI) {
//     console.log('Error: MONGODB_URI is not set. Did you run source env.sh ?');
//     process.exit(1);
// }

const adSchema = new mongoose.Schema({
    filename: {
        default: '',
        type: String
    },
    adUrl: {
        default: '',
        type: String
    },
    markerUrl: {
        default: '',
        type: String
    },
    markerPatternUrl: {
        default: '',
        type: String
    }
})

// User Schema STRETCH GOAL

const Ad = mongoose.model("Ad",adSchema);

export { Ad };