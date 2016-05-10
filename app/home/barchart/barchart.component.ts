import {Component} from 'angular2/core';

@Component({
  selector: 'barchart',
  templateUrl: 'app/home/barchart/barchart.html',
  styleUrls: ['app/home/barchart/barchart.css']
})

export class BarchartComponent {
  data = [4, 8, 15, 16, 23, 42];

}
