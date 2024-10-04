import { TestBed } from '@angular/core/testing';

import { EvenService } from './even.service';

describe('EvenService', () => {
  let service: EvenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
