const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const MODEL = 'Users';
const Users = new Schema({
    code: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

}, { collection: MODEL });
Users.index({ username: 1 });

module.exports = {
    schema: Users,
    MODEL,
    model: mongoose.model(MODEL, Users)
}