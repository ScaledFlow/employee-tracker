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
  // process_roles();
  // process_employees();
  // process_departments();
  runSearch();
  // end_connection();
});

// function which prompts the user for what action they should take

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Remove Employee",
        "Update Employee Role",
        "End Connection",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          view_employees();
          break;

        case "View All Departments":
          view_departments();
          break;

        case "View All Roles":
          view_roles();
          break;

        case "View All Employees by Department":
          view_employees_by_dept();
          break;

        case "View All Employees by Manager":
          view_employees_by_manager();
          break;

        case "Add Employee":
          add_employee();
          break;

        case "Add Department":
          add_department();
          break;

        case "Add Role":
          songSearch();
          break;

        case "Remove Employee":
          songAndAlbumSearch();
          break;

        case "Remove Employee Role":
          songAndAlbumSearch();
          break;

        case "Remove Employee Manager":
          songAndAlbumSearch();
          break;

        case "End Connection":
          end_connection();
          break;
      }
    });
}

function view_employees() {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function view_departments() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function view_roles() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function view_employees_by_dept() {
  connection.query(
    "SELECT employees.first_name, employees.last_name, roles.title, departments.department_name FROM employees JOIN roles on employees.role_id = roles.role_id JOIN departments on departments.department_id = roles.department_id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      runSearch();
    }
  );
}

function view_employees_by_manager() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

// connection.query("select * from roles", function (err, res) {
//   if (err) throw err;
//   console.table(res);
//   runSearch();
// });

function add_employee() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    // console.table(results[0].title);
    // once you have the items, prompt the user for which they'd like to bid on

    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employees first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employees last name?",
        },
        {
          name: "role",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          },
          message: "What role will the employee file?",
        },
      ])
      .then(function (answer) {
        console.log(answer);
        connection.query(
          "select * from Roles",
          // {
          //   department_name: answer.addDept,
          // },
          function (err) {
            if (err) throw err;
            // console.table(res);
            runSearch();
          }
        );
      });
  });
}

function add_department() {
  inquirer
    .prompt({
      name: "addDept",
      type: "input",
      message: "Enter the name of the department to add.",
    })
    .then(function (answer) {
      console.log(answer.addDept);
      connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: answer.addDept,
        },
        function (err) {
          if (err) throw err;
          // console.table(res);
          runSearch();
        }
      );
    });
}

function add_role() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function end_connection() {
  console.log("end connection");
  connection.end();
}
