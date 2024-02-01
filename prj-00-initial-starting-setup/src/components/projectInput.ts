namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true);
      this.element.id = "user-input";

      this.titleInputElement = this.element.querySelector("#title")!;
      this.descriptionInputElement =
        this.element.querySelector("#description")!;
      this.peopleInputElement = this.element.querySelector("#people")!;

      // this.attach();
      this.configure();
      this.renderContent();
    }

    renderContent(): void {}

    private gatherUserInput(): [string, string, number] | void {
      const userTitle = this.titleInputElement.value;
      const userDescription = this.descriptionInputElement.value;
      const userPeople = +this.peopleInputElement.value;
      if (
        !validate({ value: userTitle, required: true }) ||
        !validate({ value: userDescription, required: true, minLength: 5 }) ||
        !validate({ value: userPeople, required: true, max: 10 })
      ) {
        alert("Invalid input.");
        return;
      }
      return [userTitle, userDescription, userPeople];
    }

    private clearInputs() {
      this.titleInputElement.value =
        this.descriptionInputElement.value =
        this.peopleInputElement.value =
          "";
    }

    @AutoBind
    submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (userInput) {
        projectState.addProject(...userInput);
      }

      this.clearInputs();
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    // private attach() {
    //   this.hostElement.insertAdjacentElement("afterbegin", this.element);
    // }
  }
}
