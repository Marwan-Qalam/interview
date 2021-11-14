
const mysql = require("mysql");
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.MYDB
});


exports.login = (req, res) => {

    var email = req.body.email;
    var password = req.body.password;


    db.query('SELECT email, password FROM users WHERE email = "' + email + '" AND password = "' + password + '" ',
        function(err, results, fields)   {
            if (err) throw err;

            if (results.length > 0) {
                console.log('loged in');
                res.render('index')

            } else {
                console.log('Login Failed!');
                res.render('login')
            }


        }
    )
}