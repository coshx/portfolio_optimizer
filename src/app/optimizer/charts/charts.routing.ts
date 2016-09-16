import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { BarchartComponent } from './barchart/barchart.component';
import { LineGraphComponent } from './line-graph/line-graph.component';

const crisisCenterRoutes: Routes = [
  {
    path: 'optimizer',
    redirectTo: '/optimizer/line-graph',
    pathMatch: 'full'
  },
  {
    path: 'line-graph',
    component: LineGraphComponent,
  },
  {
    path: 'barchart',
    component: BarchartComponent
  }
];

export const chartsRouting: ModuleWithProviders = RouterModule.forChild(crisisCenterRoutes);
