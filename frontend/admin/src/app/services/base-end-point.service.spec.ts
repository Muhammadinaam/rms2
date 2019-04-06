import { TestBed } from '@angular/core/testing';

import { BaseEndPointService } from './base-end-point.service';

describe('BaseEndPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseEndPointService = TestBed.get(BaseEndPointService);
    expect(service).toBeTruthy();
  });
});
