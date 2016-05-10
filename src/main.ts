import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { enableProdMode } from '@angular/core';
import { PortfolioOptimizerAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(PortfolioOptimizerAppComponent, [
  ROUTER_PROVIDERS
]);
