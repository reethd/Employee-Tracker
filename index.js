// Assign dependencies to variables
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Assign a local sql connection to a variable
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Hypydj?Ystciitm",
  database: "employee_tracker_db",
});

// Establish connection and on success, display application title and run the initial user prompt
connection.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log(` 
   /$$$$$$$$ /$$      /$$ /$$$$$$$  /$$        /$$$$$$  /$$     /$$ /$$$$$$$$ /$$$$$$$$       /$$$$$$$$ /$$$$$$$   /$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$$ 
  | $$_____/| $$$    /$$$| $$__  $$| $$       /$$__  $$|  $$   /$$/| $$_____/| $$_____/      |__  $$__/| $$__  $$ /$$__  $$ /$$__  $$| $$  /$$/| $$_____/| $$__  $$
  | $$      | $$$$  /$$$$| $$  | $$| $$      | $$  | $$    $$ /$$/ | $$      | $$               | $$   | $$  | $$| $$  | $$| $$  |__/| $$ /$$/ | $$      | $$  | $$
  | $$$$$   | $$ $$/$$ $$| $$$$$$$/| $$      | $$  | $$     $$$$/  | $$$$$   | $$$$$            | $$   | $$$$$$$/| $$$$$$$$| $$      | $$$$$/  | $$$$$   | $$$$$$$/
  | $$__/   | $$  $$$| $$| $$____/ | $$      | $$  | $$    | $$/   | $$__/   | $$__/            | $$   | $$__  $$| $$__  $$| $$      | $$  $$  | $$__/   | $$__  $$
  | $$      | $$|  $ | $$| $$      | $$      | $$  | $$    | $$    | $$      | $$               | $$   | $$  | $$| $$  | $$| $$    $$| $$   $$ | $$      | $$  | $$
  | $$$$$$$$| $$     | $$| $$      | $$$$$$$$|  $$$$$$/    | $$    | $$$$$$$$| $$$$$$$$         | $$   | $$  | $$| $$  | $$|  $$$$$$/| $$    $$| $$$$$$$$| $$  | $$
  |________/|__/     |__/|__/      |________/  ______/     |__/    |________/|________/         |__/   |__/  |__/|__/  |__/  ______/ |__/  |__/|________/|__/  |__/`);
  menuPrompt();
});

// Assign the initial menu options list to a variable
const menu = [
  {
    type: "list",
    name: "menuChoices",
    message:
      "Welcome to the Employee Tracker Database! What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit",
    ],
  },
];

// Assign the prompt for naming a department to a variable
const addDept = [
  {
    type: "input",
    name: "dept_name",
    message: "What is the name of the new department?",
  },
];

// Runs the menu list and allows the user to select an option, navigating them to the next
// desired function in the program by using the menuSwitch function
function menuPrompt() {
  inquirer
    .prompt(menu)
    .then((answers) => {
      menuSwitch(answers.menuChoices);
    })
    .catch((error) => console.log(error));
}

// Handles the user selection from the initial menu and runs the associated function, where 
// each case is an option from the menu
// Upon choosing quit, the program terminates
function menuSwitch(answers) {
  switch (answers) {
    case "View all departments":
      viewAllDepartments();
      break;

    case "View all roles":
      viewAllRoles();
      break;

    case "View all employees":
      viewAllEmployees();
      break;

    case "Add a department":
      addDepartment();
      break;

    case "Add a role":
      addRole();
      break;

    case "Add an employee":
      addEmployee();
      break;

    case "Update an employee role":
      updateEmployee();
      break;

    case "Quit":
      console.log("Exiting program...");
      connection.end();
      break;
  }
}

// References all data from the established department table and displays it in the
// terminal before taking the user back to the initial menu prompt
function viewAllDepartments() {
  connection.query(
    "SELECT department.id AS ID, department_name AS Department FROM department",
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.table("Departments:", res);
      }
      menuPrompt();
    }
  );
}

// References all data from the established role table, and pulls the department_name associated
// with each role's department_id before displaying the table and taking the user back to the 
// initial menu prompt
function viewAllRoles() {
  connection.query(
    "SELECT role.id AS ID, title AS Title, department.department_name AS Department, salary AS Salary FROM role LEFT JOIN department ON role.department_id = department.id",
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.table("Employee Roles:", res);
      }
      menuPrompt();
    }
  );
}

// References all data from the established employee table. The department_name is pulled from
// the department.id associated with the department_id from the role table. The role is pulled from
// the role.id associated with the employee's role_id. The manager's manager.id references an
// employee with a matching manager_id. Then displays this table and returns the user to the initial
// menu prompt.
function viewAllEmployees() {
  connection.query(
    'SELECT employee.id AS ID, employee.first_name AS "First Name", employee.last_name AS "Last Name", department.department_name AS Department, role.title AS "Role", role.salary AS Salary, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON manager.id = employee.manager_id;',
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.table("Employees:", res);
      }
      menuPrompt();
    }
  );
}

// Prompts the user for a department name and then inserts that input into the department table
// as the department_name for a new entry before returning the user to the initial menu
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "dept_name",
        type: "input",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: answers.dept_name,
        },
        function (err, res) {
          if (err) throw err;
          console.log(`${answers.dept_name} department added successfully!`);
          menuPrompt();
        }
      );
    });
}

// Prompts the user for title and salary of a new role and assigns them. Also provides
// a list of departments, from which when one is chosen, reads that department's id and 
// assigns it to the new role's department_id. Then returns user to the initial menu
function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    let allDepartments = res.map((dept) => ({
      name: dept.department_name,
      value: dept.id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the role title?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?",
        },
        {
          type: "list",
          name: "dept",
          message: "Which department does this role operate in?",
          choices: allDepartments,
        },
      ])
      .then((answers) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.dept,
          },
          function (err, res) {
            if (err) throw err;
            console.log(`${answers.title} role successfully added!`);
            menuPrompt();
          }
        );
      });
  });
}


// Prompts the user for a new employee's first_name and last_name and assigns them. 
// Also provides a list of predefined roles, as well as a list of employee's with no
// manger_id to simulate a list of managers to chose from. The names in these lists are
// read as their associated ID's, which are then assigned to the role_id and manager_id
// of the new employee respectively. Then the user is returned to the initial menu.
function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    let allRoles = res.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    connection.query(
      "SELECT * FROM employee WHERE manager_id IS null",
      function (err, res) {
        if (err) throw err;
        let allManagers = res.map((manager) => ({
          name: manager.first_name + " " + manager.last_name,
          value: manager.id,
        }));

        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the employees first name?",
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the employee's last name?",
            },
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: allRoles,
            },
            {
              type: "list",
              name: "manager",
              message: "Who is the employee's manager?",
              choices: allManagers,
            },
          ])
          .then((answers) => {
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role,
                manager_id: answers.manager,
              },
              function (err, res) {
                if (err) throw err;
                console.log(
                  `New employee, ${answers.first_name} ${answers.last_name}, added successfully!`
                );

                menuPrompt();
              }
            );
          });
      }
    );
  });
}

// Prompts the user to select an employee from a list of all existing employees and the 
// role that they are to be reassigned to from a list of all existing roles. The selected
// employee's role_id is then reassigned to the ID associated with the chosen role. User is
// then returned to the intial menu prompt.
function updateEmployee() {
  connection.query(
    "SELECT * FROM employee RIGHT JOIN role on employee.role_id=role.id",
    function (err, res) {
      if (err) throw err;

      let allEmployees = res.map((emp) => ({
        name: emp.first_name + " " + emp.last_name,
        value: emp.id,
      }));

      connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        let allRoles = res.map((role) => ({
          name: role.title,
          value: role.id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "employee",
              message: "Select an existing employee.",
              choices: allEmployees,
            },
            {
              type: "list",
              name: "new_role",
              message: "Select a new role for this employee.",
              choices: allRoles,
            },
          ])
          .then((answers) => {
            connection.query(
              `UPDATE employee SET role_id=${answers.new_role} WHERE employee.id=${answers.employee}`,
              function (err, res) {
                if (err) throw err;
                console.log(`Employee updated successfully!`);
                menuPrompt();
              }
            );
          });
      });
    }
  );
}
