import { TestBed } from '@angular/core/testing';

import { TirasseService } from './tirasse.service';

describe('TirasseService', () => {
  let service: TirasseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TirasseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
