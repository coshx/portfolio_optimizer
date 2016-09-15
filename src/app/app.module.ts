import { routing, appRoutingProviders } from './app.routing';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartsComponent } from './optimizer/charts/charts.component';
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
    ChartsComponent,
    InputComponent,
    ResultsTableComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ StocksAppComponent ]
})
export class AppModule { }
