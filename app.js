const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Timber8293$@",
  database: "employees_db",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  process_roles();
  process_employees();
  process_departments();
  // connection.end();
  end_connection();
});

function process_roles() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    //console.log(res[0].department_name);
    //console.log(res);
    console.table(res);
    // connection.end();
  });
}

function process_employees() {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    //console.log(res[0].department_name);
    //console.log(res);
    console.table(res);
    // connection.end();
  });
}

function process_departments() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    //console.log(res[0].department_name);
    //console.log(res);
    console.table(res);
    // connection.end();
  });
}

function end_connection() {
  console.log("end connection");
  connection.end();
}
