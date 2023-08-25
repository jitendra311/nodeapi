const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    tittle: {
        type: String,

    },
    image: {
        type: Object,
    },
    fullname:String,
    langauge:String,
    release:Number,

    size:Object,
    quality:Object,
    format:String,

    storyline: {
        type: String,
    },
    screenshot: {
        type: String,
    },
    downlink:{
        type:String,
    },
    url:{type:String},
    isAdmin: {
        type: Boolean,
        default: false,
    },

},
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model('users', userSchema);