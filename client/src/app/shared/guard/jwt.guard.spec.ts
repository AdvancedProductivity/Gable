import { TestBed } from '@angular/core/testing';

import { JwtGuard } from './jwt-guard.guard';

describe('JwtGuardGuard', () => {
  let guard: JwtGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JwtGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
