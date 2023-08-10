import { TestBed } from '@angular/core/testing';

import { ProcessLockService } from './process-lock.service';

describe('ProcessLockService', () => {
  let service: ProcessLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessLockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
