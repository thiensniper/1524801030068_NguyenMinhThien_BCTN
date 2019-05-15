import { TestBed } from '@angular/core/testing';

import { OptService } from './opt.service';

describe('OptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptService = TestBed.get(OptService);
    expect(service).toBeTruthy();
  });
});
