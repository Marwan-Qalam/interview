const express = require('express');
const mysql = require('mysql');
const app = express();
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


dotenv.config({
    path: './.env'
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.MYDB
});



app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
 
db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to mySQL')
    }

})  

app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'))

app.listen(5001, (err) => {
    if (err) throw err;
    console.log('Server is up!');

});