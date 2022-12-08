const mysql = require("mysql")
const express = require("express")
const bodyparser = require("body-parser")
// var encoder = bodyparser.urlencoded()
const cors = require("cors")


const app = express()
app.use(cors())
app.use(bodyparser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    "password": "1234",
    "database": "fupproject"

})
connection.connect(function (error) {
    if (error) throw error
    else console.log("connection to the database successfully")
})


app.post("/login", function (req, res) {
    var email = req.body.email
    var password = req.body.password;

    console.log(email, password);
    const query = `SELECT * FROM loginuser WHERE email=${email} AND password=${password}`;
    console.log(query);

   
    connection.query(`SELECT * FROM loginuser WHERE email="${email}" AND password="${password}"`, function (error, results, fields) {
        console.log(error, results)
        if (results.length > 0) {
            console.log("email,password")
            res.status(200).send({ status: true, msg: "login successful" })
           
        }
        else {
            console.log("wrong password")
            res.status(401).send("error")
        }

    })
})



app.listen(3001)