import {Component, Input, OnChanges} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'line-graph',
  templateUrl: 'line-graph.component.html',
  styleUrls: ['line-graph.component.css']
})
export class LineGraphComponent implements OnChanges {
  title: 'Optimal Portfolio Performance';
  constructor() {}

  @Input() performance: Object;
  @Input() cumulativeReturns: number;

  createChart() {
    let optimized = this.performance['Optimized'];
    let SPY = this.performance['SPY'];

    let container = document.getElementsByClassName('line-graph')[0];
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = container.clientWidth - margin.left - margin.right,
    height = 384 - margin.top - margin.bottom;

    let x = d3.time.scale()
      .range([0, width]);

    let y = d3.scale.linear()
      .range([height, 0]);

    let xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

    let yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    let line = d3.svg.line()
      .x((d) => x(new Date(d['Date'])))
      .y((d) => y(d['Optimized']));

    let svg = d3.select('div.line-graph').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(d3.extent(optimized, (d) => new Date(d['Date'])));
    y.domain(d3.extent(optimized, (d) => d['Optimized']));

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Price ($)');

    svg.selectAll('.line')
      .data(optimized)
      .enter().append('path')
      .datum(optimized)
        .attr('class', 'line')
        .attr('d', line);
  }

  removeOldChart() {
    d3.select('div.line-graph svg').remove();
  }

  ngOnChanges() {
    // Called on changes to the bindings, including initialization.
    this.removeOldChart();
    this.createChart();
  }

}
