const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: { 
        type: String, 
        required: true 
    },
    login: { 
        type: String, 
        required: true 
    },
    avatar_url: { 
        type: String
    },
    email: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);