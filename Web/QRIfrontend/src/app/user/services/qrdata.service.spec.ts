import { TestBed } from '@angular/core/testing';

import { QrdataService } from './qrdata.service';

describe('QrdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrdataService = TestBed.get(QrdataService);
    expect(service).toBeTruthy();
  });
});
