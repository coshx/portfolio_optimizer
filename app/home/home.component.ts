import {Component} from 'angular2/core';
import {InputComponent} from './input/input.component';
import {BarchartComponent} from './barchart/barchart.component';



@Component({
  selector: 'home',
  templateUrl: 'app/home/home.html',
  styleUrls: [
    'app/home/home.css'
  ],
  directives: [InputComponent, BarchartComponent]
})

export class HomeComponent { }
