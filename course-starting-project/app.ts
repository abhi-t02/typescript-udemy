// // function Logger(logString: string) {
// //   return function (constructor: Function) {
// //     console.log("Logging.....");
// //     console.log(constructor);
// //   };
// // }

// // @Logger("LOGGING - Person")
// // class Person {
// //   name = "Max";

// //   constructor() {
// //     console.log("Creating person object...");
// //   }
// // }

// // const pers = new Person();

// // function log(target: any, propertyName: string | Symbol) {
// //   console.log("Property decorator.");
// //   console.log(target, propertyName);
// // }

// function templateLogger() {
//   console.log("Template factory");
//   return function <
//     T extends { new (...args: any[]): { title: string; price: number } }
//   >(constructor: T) {
//     return class extends constructor {
//       constructor(..._: any[]) {
//         super();
//         console.log("rendering class");
//       }
//     };
//   };
// }

// @templateLogger()
// class Product {
//   //   @log
//   title: string;
//   private _price: number;

//   constructor(title: string, price: number) {
//     this.title = title;
//     this._price = price;
//   }

//   set price(val: number) {
//     this._price = val;
//   }
// }

// const product = new Product("something", 100);

// function Autobind(_: any, _2: string | symbol, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;
//   const adjDescriptor: PropertyDescriptor = {
//     configurable: true,
//     enumerable: false,
//     get() {
//       const boundfn = originalMethod.bind(this);
//       return boundfn;
//     },
//   };
//   return adjDescriptor;
// }

// class Printer {
//   message = "This works.";

//   @Autobind
//   showMessage() {
//     console.log(this.message);
//   }
// }

// const p = new Printer();

// const btn = document.querySelector("button");
// btn?.addEventListener("click", p.showMessage);

// validation
interface validatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required'], ['positive']
  };
}

const registeredValidator: validatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidator[target.constructor.name] = {
    ...registeredValidator[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidator[target.constructor.name] = {
    ...registeredValidator[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validator(obj: any) {
  const objValidatorConfig = registeredValidator[obj.constructor.name];
  let isValid = true;
  if (!objValidatorConfig) {
    return false;
  }

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      console.log(validator);
      switch (validator) {
        case "required":
          isValid = isValid && obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

document.querySelector("form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = (<HTMLInputElement>document.querySelector("#title")).value;
  const price = (<HTMLInputElement>document.querySelector("#price")).value;

  const course = new Course(title, +price);

  if (!validator(course)) {
    alert("Invalid input.");
  }
  console.log(course);
});
