/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WardService } from './Ward.service';

describe('Service: Ward', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WardService]
    });
  });

  it('should ...', inject([WardService], (service: WardService) => {
    expect(service).toBeTruthy();
  }));
});
