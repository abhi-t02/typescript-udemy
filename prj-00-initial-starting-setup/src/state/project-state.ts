namespace App {
  export class ProjectState {
    private static instance: ProjectState;
    private listeners: Listener[] = [];
    private projects: Project[] = [];

    private constructor() {}

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }

      this.instance = new ProjectState();
      return this.instance;
    }

    addListener(listenerFn: Listener) {
      this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.ACTIVE
      );
      this.projects.push(newProject);
      this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }
  export const projectState = ProjectState.getInstance();
}
