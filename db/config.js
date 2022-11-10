const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shop"
});

//connect
db.connect((err) => {
  if (err){
    console.log(err);
    console.error('MySQL was not connected...');
  }
  else
    console.log('MySql Connected...')
});

module.exports = db;