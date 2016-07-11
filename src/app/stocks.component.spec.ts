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
import { Router, PRIMARY_OUTLET } from '@angular/router';

import { StocksAppComponent } from './stocks.component';

beforeEachProviders(() => [
  StocksAppComponent,
  Location,
  provide(Location, {useClass: SpyLocation}),
  provide(PRIMARY_OUTLET, {useValue: StocksAppComponent})
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
