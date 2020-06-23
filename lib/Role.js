// TODO: Write code to define and export the Role class

class Role {
  constructor(role_id, title, salary, department_id) {
    this.role_id = role_id;
    this.title = title;
    this.salary = salary;
    this.department_id = "department_id";
  }

  getRoleId() {
    return this.role_id;
  }
  getTitle() {
    // return parseInt(this.id, 10);
    return this.title;
  }
  getSalary() {
    return this.salary;
  }
  getDepartment_id() {
    return this.department_id;
  }
}

module.exports = Role;
