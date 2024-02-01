/// <reference path='./models/dragAndDropInterfaces.ts' />
/// <reference path='./models/project-model.ts' />
/// <reference path='./state/project-state.ts' />
/// <reference path='./utils/validation.ts' />
/// <reference path='./decorators/decorator.ts' />
/// <reference path='./components/component.ts' />
/// <reference path='./components/projectItem.ts' />
/// <reference path='./components/projectList.ts' />
/// <reference path='./components/projectInput.ts' />

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
