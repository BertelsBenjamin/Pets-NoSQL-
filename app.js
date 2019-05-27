//VARIABLES, FUNCTIONS & REQUIREMENTS
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const urlencode = bodyParser.urlencoded({ extended: true });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'petslog',
    port: '3307'
});
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
const $ = jQuery = require('jquery')(window);

function connectWithDatabase(){
    connection.connect((err) => {
        if (err) {
            console.log(err);
            console.log('Error connecting to Db');
            return;
        }
        else {
            console.log('Connected')
        };
    });
}

function queryToDatabase(query){
    connection.query(query, (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
            debugger;
        }
        else {
            console.log('Data received');
            res.send(JSON.stringify(rows));
        }
    });
}

function disconnectFromDatabase(){
    connection.end((err) => {
        console.log('Disconnected');
    });
}

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //Verwijder caching om de laatste data te ontvangen
    res.setHeader('Cache-Control', 'no-cache');
    next();
    console.log(req);
});

/*Port watcher (listener) */
app.listen('3000', () => console.log('app listening on port 3000'));

/*Post something to port 3000 */
app.get('/', function (req, res) {
    res.send('You have sent this message via res.send in an app.get request in app.js to port 3000');
})

/*Post received data (based on query) via main.js to index.html (viewable on VS Code Live Server (port 550x)) */
app.post('/loadTable', urlencode, function (req, res) {
    connectWithDatabase();
    queryToDatabase("SELECT * FROM event");
})

app.post('/insertRow', (req, res)=>{
    connectWithDatabase();
    let sql = "INSERT INTO event (reftopet, date, type, remark) VALUES ?";
    let values = [
        [8, '2019-05-21', 'litter', 'broken rib']
    ]
    connection.query(sql, [values], function (err, result){
        if (err) throw err;
        console.log('Number of records inserted: ' + result.affectedRows);
    })
    res.send("Data inserted.")
})

app.delete('/', (req, res)=>{
    res.send("Delete");
})

//disconnectFromDatabase();