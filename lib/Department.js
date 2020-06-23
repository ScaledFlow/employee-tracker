// TODO: Write code to define and export the Role class

class Department {
  constructor(department_id, department_name) {
    this.department_id = department_id;
    this.department_name = department_name;
  }

  getDepartmentId() {
    return this.department_id;
  }
  getDepartmentName() {
    // return parseInt(this.id, 10);
    return this.department_name;
  }
}

module.exports = Department;
