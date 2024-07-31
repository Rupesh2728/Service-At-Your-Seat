const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
    
    UserReferenceNumber:
    {
        type: String,
        required: true,
        trim: true
    },
    filename:
    {
        type: String,
        required: true,
        trim: true
    },
    path:
    {
        type: String,
        required: true,
        trim: true
    }


})

const DocumentCollection = mongoose.model('profilepic', DocumentSchema);
module.exports = DocumentCollection;