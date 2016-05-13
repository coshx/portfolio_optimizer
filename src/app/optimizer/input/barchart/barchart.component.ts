import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'barchart',
  templateUrl: 'barchart.html',
  styleUrls: ['barchart.css']
})

export class BarchartComponent implements OnInit {
  data = [4, 8, 15, 16, 23, 42];

  ngOnInit() {
  }
}
