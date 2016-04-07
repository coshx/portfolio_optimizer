import {Component} from "angular2/core";
import {InputComponent} from "./input.component";

@Component({
  selector: "app",
  template: `
    <h1>Coshx Portfolio Optimizer</h1>
    <user-input></user-input>`,
  directives: [InputComponent]
})

export class AppComponent { }
