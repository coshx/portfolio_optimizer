import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { StocksAppComponent } from '../app/stocks.component';

beforeEachProviders(() => [StocksAppComponent]);

describe('App: Stocks', () => {
  it('should create the app',
      inject([StocksAppComponent], (app: StocksAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'stocks works!\'',
      inject([StocksAppComponent], (app: StocksAppComponent) => {
    expect(app.title).toEqual('stocks works!');
  }));
});
