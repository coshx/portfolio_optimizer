import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { provide } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_PRIMARY_COMPONENT, RouteRegistry } from '@angular/router-deprecated';
import { RootRouter } from '@angular/router-deprecated/src/router';

import { StocksAppComponent } from './stocks-app.component';

beforeEachProviders(() => [
  StocksAppComponent,
  Location,
  RouteRegistry,
  provide(Location, {useClass: SpyLocation}),
  provide(ROUTER_PRIMARY_COMPONENT, {useValue: StocksAppComponent}),
  provide(Router, {useClass: RootRouter})
]);

// Test just component methods and attributes
describe('The StocksAppComponent', () => {
  it('should create the stocks app.',
     inject([StocksAppComponent], (app: StocksAppComponent) => {
       expect(app).toBeTruthy();
     }));

  it('should contain "Coshx Finance Tools" as the navbar title.',
     inject([StocksAppComponent], (app: StocksAppComponent) => {
       expect(app.siteName).toEqual('Coshx Finance Tools');
     }));
});
