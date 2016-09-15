import { routing, appRoutingProviders } from './app.routing';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StocksAppComponent } from './stocks.component';
import { OptimizerComponent } from './optimizer/optimizer.component';
import { InputComponent } from './optimizer/input/input.component';
import { ResultsTableComponent } from './optimizer/results-table/results-table.component';
import { ChartsModule } from './optimizer/charts/charts.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    ChartsModule
  ],
  declarations: [
    StocksAppComponent,
    OptimizerComponent,
    InputComponent,
    ResultsTableComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ StocksAppComponent ]
})
export class AppModule { }
