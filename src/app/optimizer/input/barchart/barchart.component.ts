import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  moduleId: module.id,
  selector: 'barchart',
  templateUrl: 'barchart.component.html',
  styleUrls: ['barchart.component.css']
})

export class BarchartComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.barchart();
  }

  barchart() {
    // TODO: Get data from HTTP response
    var data = [4, 8, 15, 16, 23, 42];

    var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

    d3.select('.chart')
      .selectAll('div')
        .data(data)
      .enter().append('div')
        .style('width', function(d) { return x(d) + 'px'; })
        .text(function(d) { return d; });
  }
}
