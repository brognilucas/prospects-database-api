const mongoose = require("mongoose");
const { Schema } = require('mongoose');
const MODEL = 'Prospects';
const Prospect = new Schema({
    code: { 
        type: String, 
        required: true
    },
    name: { 
        type: String, 
        required: true
    },
    position: { 
        type: String, 
        required: true
    },
    year: Number,
    height: String,
    weight: Number,
    dateOfBirth: Date,
    college: {
        type: String, 
        required: true
    },
    photo: String
}, { collection: MODEL });
Prospect.index({ code: 1} , {  unique: true })
Prospect.index({ name: 1 });
Prospect.index({ position: 1 });
Prospect.index({ position: 1, year: 1 });
Prospect.index({ college: 1 });
Prospect.index({ college: 1, year: 1 });
Prospect.index({ college: 1, position: 1, year: 1 });
Prospect.index({ college: 1, position: 1 });


module.exports = {
    schema: Prospect,
    MODEL,
    model: mongoose.model(MODEL, Prospect)
}