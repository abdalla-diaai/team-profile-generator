const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { get } = require("http");

// validation functions for user inputs using regex

const emailValidation = async (input) => {
    const regex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
    if (regex.test(input)) {
        return true;
    };
    return 'Please enter a valid value';
};

const stringValidation = async (input) => {
    const regex = /^[a-zA-Z]+$/;
    if (regex.test(input)) {
        return true;
    };
    return 'Please enter a valid value';
};

const numberValidation = async (input) => {
    const regex = /\d/;
    if (regex.test(input)) {
        return true;
    };
    return 'Please enter a valid value';
};

const mixValidation = async (input) => {
    const regex = /[\w\d]+/;
    if (regex.test(input)) {
        return true;
    };
    return 'Please enter a valid value';
};

// prompt questions for each class
const manager = [
    {
        type: 'input',
        name: 'name',
        message: 'Name: ',
        validate: stringValidation
    },
    {
        type: 'input',
        name: 'id',
        message: 'Employee ID: ',
        validate: numberValidation
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email address: ',
        validate: emailValidation

    },
    {
        type: 'input',
        name: 'office',
        message: 'Office Number: ',
        validate: mixValidation


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
        validate: stringValidation
    },
    {
        type: 'input',
        name: 'id',
        message: 'ID: ',
        validate: numberValidation

    },
    {
        type: 'input',
        name: 'email',
        message: 'Email: ',
        validate: emailValidation

    },
    {
        type: 'input',
        name: 'github',
        message: 'GitHub Username: ',
        validate: mixValidation

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
        validate: stringValidation
    },
    {
        type: 'input',
        name: 'id',
        message: 'ID: ',
        validate: numberValidation

    },
    {
        type: 'input',
        name: 'email',
        message: 'Email: ',
        validate: mixValidation
    },
    {
        type: 'input',
        name: 'school',
        message: 'School: ',
        validate: stringValidation
    },
    {
        type: 'checkbox',
        message: 'Add another team member: ',
        name: 'add',
        choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
    },
];



// array to store employees objects
const employeeList = []

// variable to store html page data
let htmlPage = '';

// function to generate objects 

function generateObj(objName, data) {
    if (objName === 'manager') {
        const newManager = new Manager(data.name, data.id, data.email, data.office);
        employeeList.push(newManager);
    }
    else if (objName === 'engineer') {
        const newEngineer = new Engineer(data.name, data.id, data.email, data.github);
        employeeList.push(newEngineer);
    }
    else if (objName === 'intern') {
        const newIntern = new Intern(data.name, data.id, data.email, data.school);
        employeeList.push(newIntern);
    }
}

// set initial values of object and prompt questions to manager

let objectName = 'manager';
let questions = manager;

// main function to kick off prompts
function getTeamInfo() {
    inquirer.prompt(questions).then((answers) => {
        generateObj(objectName, answers);
        if (answers.add[0] === 'Add an engineer') {
            objectName = 'engineer';
            questions = engineer;
            getTeamInfo();
        }
        else if (answers.add[0] === 'Add an intern') {
            objectName = 'intern';
            questions = intern;
            getTeamInfo();
        }
        else {
            htmlPage = render(employeeList);
            fs.writeFile(outputPath, htmlPage, err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Team page has been generated successfully and saved to output folder!');
                };
            });
        };
    });
};

// call main function
getTeamInfo();
