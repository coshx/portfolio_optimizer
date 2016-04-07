import {Component} from "angular2/core";
import {InputService} from "./input.service";
import {AutoGrowDirective} from "./auto-grow.directive";

@Component({
  selector: "user-input",
  template: `
    <h2>Some user input goes here</h2>
    {{ title }}
    <input type="text" autoGrow />
    <ul>
      <li *ngFor="#course of courses">
        {{ course }}
      </li>
    </ul>
`,
  providers: [InputService],
  directives: [AutoGrowDirective]
})

export class InputComponent {
  title = "The title of input component";
  courses;

  constructor(inputService: InputService) {
    this.courses = inputService.getInput();
  }
}
