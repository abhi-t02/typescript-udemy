class Department {
  private employees: string[] = [];
  static year = "2020";

  // id - readonly
  constructor(private readonly id: number, public userName: string) {}

  describe(this: Department) {
    console.log(`hello, ${this.userName}`);
  }

  addEmployees(employee: string) {
    this.employees.push(employee);
  }

  printEmployees() {
    console.log(...this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: number) {
    super(id, "IT");
  }
}

class Accounting extends Department {
  private static instance: Accounting;

  private constructor(id: number) {
    super(id, "Accounting");
  }

  static getInstance(id: number) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Accounting(id);
    return this.instance;
  }
}

// const accounting = new Department(1, "Someone");
// accounting.addEmployees("no one");
// accounting.addEmployees("hey one");
// accounting.printEmployees();

Department.year = "uear";
console.log(Department.year);

// const copyObj = { describe: accounting.describe };

// copyObj.describe.bind(accounting)();

// export {};
