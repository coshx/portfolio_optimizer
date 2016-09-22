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

  // TODO: Format performance (dates) and other inputs

  createChart() {
    console.log(this.performance);

    let container = document.getElementsByClassName("line-graph")[0];
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = container.clientWidth - margin.left - margin.right,
    height = 384 - margin.top - margin.bottom;

    let formatDate = d3.time.format("%m/%d/%Y");

    var x = d3.time.scale()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .x(function(p) { return x(p.date); })
      .y(function(p) { return y(p.close); });

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(this.performance, function(p) { return p.date; }));
    y.domain(d3.extent(this.performance, function(p) { return p.close; }));

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

    svg.append("path")
      .datum(this.performance)
      .attr("class", "line")
      .attr("d", line);
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
