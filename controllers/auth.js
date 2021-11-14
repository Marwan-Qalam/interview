
const mysql = require("mysql");
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.MYDB
});


exports.register = (req, res) => {
    console.log(req.body)

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm; 

   

    db.query('SELECT email FROM users WHERE email = ?',
        [email],
        async (error, results) => {
            if (error) {
                console.log(error);
            };         

            if (results.length > 0) {
                return res.render('register',
                    console.log('Email is aleady in use with another account!')
                )
            }

            else if (password !== passwordConfirm) {
                return res.render('register',
                    console.log('Password error')
                )
            };


            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);


            db.query('INSERT INTO users SET ?',
                {
                    name: name,
                    email: email,
                    password: hashedPassword,
                },
                (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('index')
                        console.log('A new user is added successfully')
                    }
                }
            )

        }
    )



    //res.send("Submitted text")




}