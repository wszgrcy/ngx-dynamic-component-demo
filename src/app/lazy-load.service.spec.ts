/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LazyLoadService } from './lazy-load.service';

describe('Service: LazyLoad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyLoadService]
    });
  });

  it('should ...', inject([LazyLoadService], (service: LazyLoadService) => {
    expect(service).toBeTruthy();
  }));
});
