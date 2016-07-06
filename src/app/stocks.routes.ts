import { provideRouter, RouterConfig } from '@angular/router';

import { OptimizerComponent } from './optimizer/optimizer.component';

export const routes = [
  { path: '', redirectTo: '/optimizer', pathMatch: 'full'},	
  { path: 'optimizer', component: OptimizerComponent }
];

export const STOCKS_ROUTER_PROVIDERS = [
  provideRouter(routes)
];