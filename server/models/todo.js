var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
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
    schedule: {
        type: Boolean,
        default: false
    },
    users: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});


// Export the model
module.exports = mongoose.model('tasks', TodoSchema);