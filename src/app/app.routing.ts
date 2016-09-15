import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptimizerComponent } from './optimizer/optimizer.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/optimizer', pathMatch: 'full'},
  { path: 'optimizer', component: OptimizerComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
