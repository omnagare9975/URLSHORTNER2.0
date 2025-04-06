const mongoose = require('mongoose');

const ConnectMongoDB = (url) => {
    mongoose.connect(url)
        .then(() => console.log('DB is Connected'))
        .catch((err) => console.log(`Failed To Connect to database`, err));
};

const UrlSchema = mongoose.Schema({
    ShortURL: {   // Ensure this matches in all queries
        type: String,
        required: true
        
    },
    ReDirect: {
        type: String,
        required: true,
        unique: true
    },
    VistedHistory: [{ timestamp: { type: Number } }]  // Fix `timestapm` typo
}, { timestamps: true });  // Fix `timestapm` typo in options

const UrlModel = mongoose.model('urlModel', UrlSchema);

module.exports = { ConnectMongoDB, UrlModel };
