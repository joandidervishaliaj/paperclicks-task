const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repoSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Repo', repoSchema);