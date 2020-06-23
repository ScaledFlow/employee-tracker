const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const Employee = require("./lib/Employee");
const Role = require("./lib/Role");
const Department = require("./lib/Role");

let employees = [];
let roles = [];
let departments = [];

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
  runSearch();
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
          add_roles();
          break;

        case "Update Employee Role":
          Update_employee_roles();
          break;

        case "End Connection":
          end_connection();
          break;
      }
    });
}
// Query all employees
function view_employees() {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

// Query all departments
function view_departments() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

// Query all roles
function view_roles() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

// Query employees by the department they are in
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

// Add a role
function add_roles() {
  connection.query("SELECT * FROM departments", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the employees title?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the employees salary?",
        },
        {
          name: "department_id",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].department_id);
            }
            return choiceArray;
          },
          message: "What department will the employee be in?",
        },
      ])
      .then(function (answer) {
        console.log(answer);
        console.log(answer.department_id);
        connection.query(
          "INSERT INTO roles SET ?",
          [
            {
              title: answer.title,
              salary: answer.salary,
              department_id: answer.department_id,
            },
          ],
          function (err) {
            if (err) throw err;
            runSearch();
          }
        );
      });
  });
}

// Add and employee
function add_employee() {
  connection.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
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
          name: "role_id",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].role_id);
            }
            return choiceArray;
          },
          message: "What role will the employee fill?",
        },
        {
          name: "manager_id",
          type: "rawlist",
          choices: [1, 2, 3],
          message: "What is the manager id?",
        },
      ])
      .then(function (answer) {
        console.log(answer);
        console.log(answer.role_id);
        connection.query(
          "INSERT INTO employees SET ?",
          [
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              role_id: answer.role_id,
              manager_id: answer.manager_id,
            },
          ],
          function (err) {
            if (err) throw err;
            runSearch();
          }
        );
      });
  });
}

// Add a department
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
          runSearch();
        }
      );
    });
}

// Update an employee role
function Update_employee_roles() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter the employees first name.",
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter the employees last name.",
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter the employees new department.",
      },
    ])
    .then(function (answer) {
      console.log(answer.role_id);
      connection.query(
        "UPDATE employees SET role_id = ? where first_name = ? and last_name = ?",
        [answer.role_id, answer.first_name, answer.last_name],

        function (err) {
          if (err) throw err;
          runSearch();
        }
      );
    });
}

// End database connection
function end_connection() {
  console.log("end connection");
  connection.end();
}
