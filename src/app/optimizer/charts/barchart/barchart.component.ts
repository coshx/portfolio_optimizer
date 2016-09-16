import {Component, Input, OnChanges} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'barchart',
  templateUrl: 'barchart.component.html',
  styleUrls: ['barchart.component.css']
})
export class BarchartComponent implements OnChanges {
  constructor() {}

  @Input() optimalAllocs: Array<any>;
  @Input() title: string;

  createChart() {
    let container = document.getElementsByClassName('chart')[0];
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = container.clientWidth - margin.left - margin.right,
    height = 384 - margin.top - margin.bottom;

    let x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    let y = d3.scale.linear()
        .range([height, 0]);

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    let yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    let svg = d3.select('div.chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(this.optimalAllocs.map(function(d) { return d.name; }));
    y.domain([0, d3.max(this.optimalAllocs, function(d) { return d.value; })]);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    svg.selectAll('.bar')
        .data(this.optimalAllocs)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.name); })
        .attr('width', x.rangeBand())
        .attr('y', function(d) { return y(d.value); })
        .attr('height', function(d) { return height - y(d.value); });
  }

  removeOldChart() {
    // If svg element exists, remove it
    // If it doesn't, nothing happens
    d3.select('svg').remove();
  }

  ngOnChanges(){
    // Called on changes to the bindings
    // At the very beginning when the bindings are first specified, this counts as a change
    this.removeOldChart();
    this.createChart();
  }

}
