var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpirtSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// Export the model
module.exports = mongoose.model('expiryTask', ExpirtSchema);