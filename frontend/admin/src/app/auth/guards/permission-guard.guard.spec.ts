import { TestBed, async, inject } from '@angular/core/testing';

import { PermissionGuardGuard } from './permission-guard.guard';

describe('PermissionGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionGuardGuard]
    });
  });

  it('should ...', inject([PermissionGuardGuard], (guard: PermissionGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
