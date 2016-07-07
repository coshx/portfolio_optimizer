import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { enableProdMode } from '@angular/core';
import { StocksAppComponent, environment } from './app/';
import { disableDeprecatedForms, provideForms } from '@angular/forms'
import { STOCKS_ROUTER_PROVIDERS } from './app/stocks.routes';


if (environment.production) {
  enableProdMode();
}

bootstrap(StocksAppComponent, [
  STOCKS_ROUTER_PROVIDERS,
  disableDeprecatedForms(),
  provideForms()
]);
