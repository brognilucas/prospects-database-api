const express = require('express');
const app = express(); 
const routes = require('./routes');
const PORT = process.env.PORT || 3000; 
const configDB = require('./config/db')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);
app.listen(PORT , async () => { 
    console.log('starting db...')
    await configDB();
});

module.exports = app;

