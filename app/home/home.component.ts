import {Component} from 'angular2/core';
import {InputComponent} from './input/input.component';
import {BarchartComponent} from './input/barchart/barchart.component';
import {ResultsTableComponent} from './input/results-table/results-table.component';

@Component({
  selector: 'home',
  templateUrl: 'app/home/home.html',
  styleUrls: ['app/home/home.css'],
  directives: [InputComponent, BarchartComponent, ResultsTableComponent]
})

export class HomeComponent { }
