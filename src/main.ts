import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { enableProdMode } from '@angular/core';
import { StocksAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(StocksAppComponent, [
  ROUTER_PROVIDERS
]);
