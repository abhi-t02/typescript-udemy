namespace App {
  // Project status
  export enum ProjectStatus {
    ACTIVE,
    FINISHED,
  }

  export type Listener = (items: Project[]) => void;

  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public numOfPeople: number,
      public status: ProjectStatus
    ) {}
  }
}
