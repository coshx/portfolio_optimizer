import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { ChartsComponent } from './charts.component';
import { BarchartComponent } from './barchart/barchart.component';
import { LineGraphComponent } from './line-graph/line-graph.component';

const crisisCenterRoutes: Routes = [
  {
    path: '',
    redirectTo: '/charts',
    pathMatch: 'full'
  },
  {
    path: 'charts',
    component: ChartsComponent,
    children: [
      {
        path: 'line-graph',
        component: LineGraphComponent,
      },
      {
        path: 'barchart',
        component: BarchartComponent
      }
    ]
  }
];

export const chartsRouting: ModuleWithProviders = RouterModule.forChild(crisisCenterRoutes);
