const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Rx = require("rxjs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const manager = [
    {
        type: 'input',
        name: 'name',
        message: 'Name: ',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Employee ID: ',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email address: ',
    },
    {
        type: 'input',
        name: 'office',
        message: 'Office Number: ',
    },
    {
        type: 'checkbox',
        message: 'Add another team member: ',
        name: 'add',
        choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
    },
];

const engineer = [
    {
        type: 'input',
        name: 'name',
        message: `Engineer's Name: `,
    },
    {
        type: 'input',
        name: 'id',
        message: 'ID: ',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email: ',
    },
    {
        type: 'checkbox',
        message: 'Add another team member: ',
        name: 'add',
        choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
    },
];
const intern = [
    {
        type: 'input',
        name: 'name',
        message: `Intern's Name: `,
    },
    {
        type: 'input',
        name: 'id',
        message: 'ID: ',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email: ',
    },
    {
        type: 'input',
        name: 'school',
        message: 'School: ',
    },
    {
        type: 'checkbox',
        message: 'Add another team member: ',
        name: 'add',
        choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
    },
];
const employeeList = []
let htmlPage = '';
function init() {
    inquirer
        .prompt(manager)
        .then((data) => {
            const newManager = new Manager(data.name, data.id, data.email, data.office);
            employeeList.push(newManager);
            htmlPage = render(employeeList);
            fs.writeFile(outputPath, htmlPage, err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('File written successfully!');
                };
            });
        });
      
};

init();

