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

  @Input() optimalAllocs;
  @Input() title;
  chart;
  viewInitialized = false;

  getPanelBody() {
    var panelTitleElements = d3.selectAll('.panel-title');
    for (let i = 0; i < panelTitleElements.length; i++) {
      for (let j = 0; j < panelTitleElements[i].length; j++) {
        if ((panelTitleElements[i][j] as any).innerHTML === this.title) {
          var panelTitleElement = (panelTitleElements[i][j] as any);
          break;
        }
      }
    }

    var parent = panelTitleElement.parentElement.parentElement;

    for (let i = 0; i < parent.childNodes.length; i++) {
      if (parent.childNodes[i].className === 'panel-body') {
        var panelBodyElement = parent.childNodes[i];
      }
    }
    return panelBodyElement;
  }
  getPanelDimensions() {
    var panelBodyElement = this.getPanelBody();
    return { width: panelBodyElement.clientWidth, height: 400 };
  }
  getChartElement() {
    return d3.select(this.getPanelBody()).select('.chart');
  }

  updateChart(){
    var margin = { top: 20, right: 30, bottom: 30, left: 40 };

    var panelDimensions = this.getPanelDimensions();

    var width = panelDimensions.width - margin.left - margin.right,
    height = panelDimensions.height - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    this.chart = this.getChartElement()
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .select('.body')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(this.optimalAllocs.map(function(d) { return Object.keys(d)[0]; }));
    y.domain([0, d3.max(this.optimalAllocs, function(d) { return parseFloat((d as any)[Object.keys(d)[0]]); })]);

    this.chart.select('.x.axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    this.chart.select('.y.axis')
      .call(yAxis);

    this.chart.selectAll('.bar').remove();

    this.chart.selectAll('.bar')
      .data(this.optimalAllocs)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return x(Object.keys(d)[0]); })
      .attr('y', function(d) { return y(parseFloat((d as any)[Object.keys(d)[0]])); })
      .attr('height', function(d) { return height - y(parseFloat((d as any)[Object.keys(d)[0]])); })
      .attr('width', x.rangeBand());
  }

  createChart(){
    var margin = { top: 20, right: 30, bottom: 30, left: 40 };

    var panelDimensions = this.getPanelDimensions();

    var width = panelDimensions.width - margin.left - margin.right,
    height = panelDimensions.height - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    this.chart = this.getChartElement()
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('class','body')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(this.optimalAllocs.map(function(d) { return Object.keys(d)[0]; }));
    y.domain([0, d3.max(this.optimalAllocs, function(d) { return parseFloat((d as any)[Object.keys(d)[0]]); })]);

    this.chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    this.chart.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    this.chart.selectAll('.bar')
      .data(this.optimalAllocs)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return x(Object.keys(d)[0]); })
      .attr('y', function(d) { return y(parseFloat((d as any)[Object.keys(d)[0]])); })
      .attr('height', function(d) { return height - y(parseFloat((d as any)[Object.keys(d)[0]])); })
      .attr('width', x.rangeBand());
  }
  onResize(){
  }

  ngAfterViewInit(){
    this.createChart();
    this.viewInitialized = true;
  }

  ngOnChanges(){
    if (this.viewInitialized) {
      this.updateChart();
    }
  }

}
