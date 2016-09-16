import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { ChartManagerComponent } from './chart-manager.component';
import { BarchartComponent } from './barchart/barchart.component';
import { LineGraphComponent } from './line-graph/line-graph.component';

const chartsRoutes: Routes = [
  {
    path: 'optimizer',
    redirectTo: '/optimizer/charts',
    component: ChartManagerComponent,
    pathMatch: 'full',
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
  },
];

export const chartsRouting: ModuleWithProviders = RouterModule.forChild(chartsRoutes);
