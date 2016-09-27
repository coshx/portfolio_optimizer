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

  @Input() performance: string;
  @Input() cumulativeReturns: number;

  createChart() {
    let data = JSON.parse(this.performance);
    let portfolios = Object.keys(data[0]).slice(1).map(function(id) {
      return {
        id: id,
        values: data.map(function(d) {
          return {date: d['Date'], returns: d[id]};
        })
      };
    });

    let container = document.getElementsByClassName('line-graph')[0];
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = container.clientWidth - margin.left - margin.right,
    height = 384 - margin.top - margin.bottom;

    let x = d3.time.scale().range([0, width]);
    let y = d3.scale.linear().range([height, 0]);
    let z = d3.scale.category10();

    let xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

    let yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    let line = d3.svg.line()
      .x((d) => x(new Date(d['date'])))
      .y((d) => y(d['returns']));

    let svg = d3.select('div.line-graph').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(d3.extent(data, (d) =>  new Date(d['Date']) ));

    y.domain([
      d3.min(portfolios, (p) => d3.min(p.values, (d) => d['returns'])),
      d3.max(portfolios, (p) => d3.max(p.values, (d) => d['returns']))
    ]);

    z.domain(portfolios.map((p) => p.id));

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
        .text('Cumulative Returns');

    let portfolio = svg.selectAll('.portfolio')
      .data(portfolios)
      .enter().append('g')
      .attr('class', 'portfolio');

    portfolio.append('path')
      .attr('class', 'line')
      .attr('d', (d) => line(d['values']))
      .style('stroke', (d) => z(d.id));

    // Add labels to curves
    // portfolio.append('text')
    //   .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
    //   .attr('transform', function(d) { return 'translate(' + x(d.value.date) + ',' + y(d.value.returns) + ')'; })
    //   .attr('x', 3)
    //   .attr('dy', '0.35em')
    //   .style('font', '10px sans-serif')
    //   .text(function(d) { return d.id; });
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
