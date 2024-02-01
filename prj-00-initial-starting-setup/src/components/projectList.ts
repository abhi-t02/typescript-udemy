namespace App {
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    private assignedProjects: Project[] = [];
    constructor(private type: "active" | "finished") {
      super("project-list", "app", false);
      this.element.id = `${this.type}-projects`;

      this.configure();
      // this.attach();
      this.renderContent();
    }

    @AutoBind
    dragOverHandler(event: DragEvent): void {
      event.preventDefault();
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @AutoBind
    dropHandler(event: DragEvent): void {
      projectState.moveProject(
        event.dataTransfer!.getData("text/plain"),
        this.type === "active" ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
      );
    }

    @AutoBind
    dragLeaveHandler(event: DragEvent): void {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);

      projectState.addListener((projects: Project[]) => {
        const releventProjects = projects.filter((prj) => {
          if (this.type === "active") {
            return prj.status === ProjectStatus.ACTIVE;
          }
          return prj.status === ProjectStatus.FINISHED;
        });

        this.assignedProjects = releventProjects;
        this.renderProjects();
      });
    }

    private renderProjects() {
      const listEl = <HTMLUListElement>(
        document.getElementById(`${this.type}-projects-list`)
      );
      listEl.innerHTML = "";
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
      }
    }

    renderContent() {
      this.element.querySelector("ul")!.id = `${this.type}-projects-list`;
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " Projects";
    }

    // private attach() {
    //   this.hostElement.insertAdjacentElement("beforeend", this.element);
    // }
  }
}
