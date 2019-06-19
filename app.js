//VARIABLES, FUNCTIONS & REQUIREMENTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const urlencode = bodyParser.urlencoded({ extended: true });

mongoose.connect('mongodb://localhost:27017/petslog', { useNewUrlParser: true });
mongoose.connection
    .on('connected', () => { console.log('Connected') })
    .on('error', (err) => { console.log('error', err.message) })

const petSchema = new Schema({
    name: String,
    owner: String,
    species: String,
    sex: String,
    birth: Date
})

const eventSchema = new Schema({
    date: Date,
    type: String,
    remark: String,
})

const petslog = [];
petslog['pet'] = mongoose.model('Pet', petSchema);
petslog['event'] = mongoose.model('Event', eventSchema);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //Verwijder caching om de laatste data te ontvangen
    res.setHeader('Cache-Control', 'no-cache');
    next();
    //console.log(req);
});

//VIEWABLE IN LOCALHOST:3000
app.get('/', (req, res) => {
    petslog['event'].find({}, (err, rows) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(rows);
            res.send(rows);
        }
    })
})

/*GET ALL PETS */
app.post('/pet', urlencode, (req, res) => {
    mongoose.model('pet', petSchema).find({}, (err, rows) => {
        if (err) {
            console.log(err)
            res.send(err);
        }
        else {
            console.log(rows);
            res.json(rows);
        }
    })
})

/*GET ALL EVENTS */
app.post('/event', urlencode, (req, res) => {
    mongoose.model('event', eventSchema).find({}, (err, rows) => {
        if (err) {
            console.log(err)
            res.send(err);
        }
        else {
            console.log(rows);
            res.json(rows);
        }

    })

})

/*Port watcher (listener) */
app.listen('3000', () => console.log('app listening on port 3000'));