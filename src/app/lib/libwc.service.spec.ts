import { TestBed } from '@angular/core/testing';

import { LibwcService } from './libwc.service';

describe('LibwcService', () => {
  let service: LibwcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibwcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
