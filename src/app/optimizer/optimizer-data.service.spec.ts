import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { OptimizerDataService } from './optimizer-data.service';

describe('OptimizerData Service', () => {
  beforeEachProviders(() => [OptimizerDataService]);

  it('should ...',
      inject([OptimizerDataService], (service: OptimizerDataService) => {
    expect(service).toBeTruthy();
  }));
});
