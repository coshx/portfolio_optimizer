import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptimizerComponent } from './optimizer/optimizer.component';
import { ChartsComponent } from './optimizer/charts/charts.component';
import { BarchartComponent } from './optimizer/charts/barchart/barchart.component';
import { LineGraphComponent } from './optimizer/charts/line-graph/line-graph.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/optimizer',
    pathMatch: 'full'
  },
  {
    path: 'optimizer',
    component: OptimizerComponent,
    children: [
      {
        path: '',
        redirectTo: '/optimizer/line-graph',
        pathMatch: 'full'
      },
      {
        path: 'line-graph',
        component: LineGraphComponent
      },
      {
        path: 'barchart',
        component: BarchartComponent
      }
    ]
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
