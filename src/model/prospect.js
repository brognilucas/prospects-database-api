const mongoose = require("mongoose");
const { Schema } = require('mongoose');
const MODEL = 'Prospect'; 
const Prospect =  new Schema({ 
    name: String, 
    position: String,
    college: String,
    dateOfBirth: Date,
    height: String,
    weight: Number, 
    bestSkills: Array, 
    worstSkills: Array, 
    description: String
} , { collection: MODEL });

Prospect.index({ name: 1 });
Prospect.index({ position: 1 });
Prospect.index({ college: 1 }); 
Prospect.index({ college: 1, position: 1 });


module.exports = { 
    schema: Prospect, 
    MODEL,
    model:  mongoose.model(MODEL, Prospect)
}