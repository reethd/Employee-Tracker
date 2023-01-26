-- Resets database when the schema is run
DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

-- References the employee_tracker_db database
USE employee_tracker_db;

-- Creates department table with department names assigned to incrementing ID's
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Creates role table with title, salary, and department_id where the department_id is 
-- pulled from the unique ID's assigned in the department table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (id),
    PRIMARY KEY (id)
);

-- Creates employee table with first_name, last_name, role_id, and manager_id. role_id is 
-- pulled from the assigned ID's in the role table and manager_id is pulled from an assigned
-- employee ID.
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id),
    PRIMARY KEY (id)
);


