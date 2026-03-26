const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Event = require('./models/Event');
const app = express();
mongoose.connect('mongodb://localhost:27017/eventDB')
    .then(() => console.log("DB Connected!"))
    .catch(err => console.log(err));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.render('register'));

app.post('/register', async (req, res) => {
    try {
        const newReg = new Event(req.body);
        await newReg.save();
        res.render('success'); 
    } catch (err) {
        res.status(500).send("Error saving to database");
    }
});
app.get('/registrations', async (req, res) => {
    const allData = await Event.find({});
    res.render('list', { data: allData });
});
app.listen(3000, () => console.log("Server running on http://localhost:3000"));