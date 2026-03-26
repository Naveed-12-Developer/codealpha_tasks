const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    event: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Event', eventSchema);