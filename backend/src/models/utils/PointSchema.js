const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

module.exports = PointSchema;