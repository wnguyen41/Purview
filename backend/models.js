const mongoose = require('mongoose');

// Mongoose Connection
if (!process.env.MONGODB_URI) {
    console.log('Error: MONGODB_URI is not set. Did you run source env.sh ?');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
    .then(()=>console.log('Successfully connected to MongoDB'), err=>console.log(err));
mongoose.set('useFindAndModify', false);

const adSchema = new mongoose.Schema({
    markerName: {
        default: '',
        type: String
    },
    adUrl: {
        default: '',
        type: String
    },
})

const Ad = mongoose.model("Ad", adSchema);

module.exports = { Ad };