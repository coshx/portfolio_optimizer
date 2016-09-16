import { routing, appRoutingProviders } from './app.routing';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { StocksAppComponent } from './stocks.component';
import { OptimizerComponent } from './optimizer/optimizer.component';
import { InputComponent } from './optimizer/input/input.component';
import { ResultsTableComponent } from './optimizer/results-table/results-table.component';
import { ChartsComponent } from './optimizer/charts/charts.component';
import { BarchartComponent } from './optimizer/charts/barchart/barchart.component';
import { LineGraphComponent } from './optimizer/charts/line-graph/line-graph.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    TabsModule
  ],
  declarations: [
    StocksAppComponent,
    OptimizerComponent,
    InputComponent,
    ResultsTableComponent,
    ChartsComponent,
    BarchartComponent,
    LineGraphComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ StocksAppComponent ]
})
export class AppModule { }
