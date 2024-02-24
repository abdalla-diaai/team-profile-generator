// TODO: Write code to define and export the Employee class
class Employee {
    constructor(firstName = null, id = null, email = null) {
        this.firstName = firstName;
        this.id = id;
        this.email = email;
    };
    getName() {
        return this.firstName;
    };
    getId() {
        return this.id;
    };
    getEmail() {
        return this.email;
    };
    getRole() {
        return 'Employee';
    };
};

module.exports = Employee;
