import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { StocksAppComponent, environment } from './app/';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { STOCKS_ROUTER_PROVIDERS } from './app/stocks.routes';

if (environment.production) {
  enableProdMode();
}

bootstrap(StocksAppComponent, [
    STOCKS_ROUTER_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]);
