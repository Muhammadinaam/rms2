import { TestBed } from '@angular/core/testing';

import { MenuModalService } from './menu-modal.service';

describe('MenuModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuModalService = TestBed.get(MenuModalService);
    expect(service).toBeTruthy();
  });
});
