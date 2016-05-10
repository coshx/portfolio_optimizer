import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { PortfolioOptimizerAppComponent } from '../app/portfolio-optimizer.component';

beforeEachProviders(() => [PortfolioOptimizerAppComponent]);

describe('App: PortfolioOptimizer', () => {
  it('should create the app',
      inject([PortfolioOptimizerAppComponent], (app: PortfolioOptimizerAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'portfolio-optimizer works!\'',
     inject([PortfolioOptimizerAppComponent], (app: PortfolioOptimizerAppComponent) => {
       expect(app.title).toEqual('portfolio-optimizer works!');
  }));
});
