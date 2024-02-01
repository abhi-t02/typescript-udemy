interface Person {
  name: string;
  age?: number;

  greet: (phrase: string) => void;
}

class Someone implements Person {
  constructor(public name: string, public age?: number) {}

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

const someone = new Someone("somebody");

// let user: Person;

// user = {
//   name: "some",
//   age: 12,
//   greet(phrase) {
//     console.log(phrase + " " + this.name);
//   },
// };
