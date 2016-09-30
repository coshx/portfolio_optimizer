/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TopbarStatusService } from './topbar-status.service';

describe('Service: TopbarStatus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopbarStatusService]
    });
  });

  it('should ...', inject([TopbarStatusService], (service: TopbarStatusService) => {
    expect(service).toBeTruthy();
  }));
});
