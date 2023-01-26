
  # Employee Tracker
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests) 
  - [License](#license)
  - [Contact](#contact)

  ## Description
  This app establishes an interactive database for a user to view and update a series of employees, their roles, and departments. It uses nodejs for the front end and depends on the inquirer, mysql2, and inquirer packages.

  ## Installation
  In order for this application to function properly, make sure that you have nodejs and mysql properly installed. Then, navigate to the directory that you have cloned this repository into and log into mysql by entering <mysql -u root -p>. Once logged in, enter <source ./db/schema.sql> and <source ./db/seeds.sql>. These will eestablish the initial database. You can then enter <npm i> to install all dependencies and run the application by entering <npm start>.

  ## Usage
  After running the <npm start> command, the user will choose what to do from a provided list of actions. Simply follow the prompts on screen and the application will update the database for you. To exit the application, choose the "Quit" option from the main menu or type <ctrl + c>.

  ## Contributing
  Contact me through github with any contributions that ayou may have.

  ## Tests
  The application can be tested by running it in VS Code with a javascript debug terminal. Also, the mysql functions can be copied into Workbench to be tested. 

  ## License
  MIT

  ## Contact
  Github: reethd
  Email: reeth.dasgupta@gmail.com

