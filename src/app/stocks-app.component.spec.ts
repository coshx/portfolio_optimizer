import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';

import { StocksAppComponent } from './stocks-app.component';

beforeEachProviders(() => [StocksAppComponent]);

// Test just component methods and attributes
describe('The StocksAppComponent.', () => {
  it('should create the stocks app',
     inject([StocksAppComponent], (app: StocksAppComponent) => {
       expect(app).toBeTruthy();
     }));

  it('should have an attribute that contains application routes.',
     inject([StocksAppComponent], (app: StocksAppComponent) => {
       expect(app.appRoutes).toBeTruthy();
     }));
});
