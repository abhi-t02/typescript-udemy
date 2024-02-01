namespace App {
  // project item
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLElement>
    implements Draggable
  {
    private project: Project;

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.project = project;
      this.renderContent();
    }

    get persons() {
      if (this.project.numOfPeople === 1) {
        return "1 Person";
      }
      return `${this.project.numOfPeople} Persons`;
    }

    @AutoBind
    dragStartHandler(event: DragEvent): void {
      event.dataTransfer?.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }

    @AutoBind
    dragEndHandler(_: DragEvent): void {}

    configure(): void {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent(): void {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent = this.persons + " asigned";
      this.element.querySelector("p")!.textContent = this.project.description;
      this.configure();
      // this.hostElement.inset
    }
  }
}
