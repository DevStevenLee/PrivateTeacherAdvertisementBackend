
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    photo: {
        uri: {
            type: String,
        }
    },

    cardBackgroundColor: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    instrument: {
        type: String,
        required: true
    },
    location: {
        city: {
            type: String,
            required: true
        },

        region: {
            type: String,
            required: true
        }
    },
    contact: {
        address: {
            type: String,
        }
    },
    description: {
        type: String
    },

    user: {
        type: String,
        ref: 'User',
        
        required: true
    },
});


module.exports = mongoose.model('Profile', ProfileSchema);