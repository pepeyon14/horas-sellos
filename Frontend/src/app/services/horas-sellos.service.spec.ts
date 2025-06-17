import { TestBed } from '@angular/core/testing';

import { HorasSellosService } from './horas-sellos.service';

describe('HorasSellosService', () => {
  let service: HorasSellosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorasSellosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
