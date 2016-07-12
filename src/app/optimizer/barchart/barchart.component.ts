import {Component, OnInit, Input, AfterViewInit, OnChanges} from '@angular/core';
import * as d3 from 'd3';

import {OptimizerDataService} from '../optimizer-data.service';


@Component({
  moduleId: module.id,
  selector: 'barchart',
  templateUrl: 'barchart.component.html',
  styleUrls: ['barchart.component.css']
})


export class BarchartComponent{
  constructor(private optimizerDataService: OptimizerDataService) {}

  @Input() optimalAllocs: Array<any>;
  @Input() title;
  viewInitialized = false;

  create() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("div.chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(this.optimalAllocs.map(function(d) { return d.name; }));
    y.domain([0, d3.max(this.optimalAllocs, function(d) { return d.value; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    svg.selectAll(".bar")
        .data(this.optimalAllocs)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });
  }
  removeOldChart() {
    let chartDiv = document.getElementsByClassName("chart")[0];
    chartDiv.removeChild(chartDiv.childNodes[0]);
  }

  onResize(){
  }

  ngAfterViewInit(){
    this.create();
    this.viewInitialized = true;
  }

  ngOnChanges(){
    if (this.viewInitialized) {
      this.removeOldChart();
      this.create();
      //this.updateChart();
    }
    
  }

}
