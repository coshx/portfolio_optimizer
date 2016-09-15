import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { ChartsComponent } from './charts.component';
import { BarchartComponent } from './barchart/barchart.component';
import { LineGraphComponent } from './line-graph/line-graph.component';

import { chartsRouting } from './charts.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    chartsRouting
  ],
  declarations: [
    ChartsComponent,
    BarchartComponent,
    LineGraphComponent
  ],

  providers: [
  ]
})
export class ChartsModule {}
