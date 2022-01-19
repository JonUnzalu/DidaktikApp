import { TestBed } from '@angular/core/testing';

import { LokalizazioakService } from './lokalizazioak.service';

describe('LokalizazioakService', () => {
  let service: LokalizazioakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LokalizazioakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
