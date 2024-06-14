import { TestBed } from '@angular/core/testing';

import { ListeFavorisService } from './liste-favoris.service';

describe('ListeFavorisService', () => {
  let service: ListeFavorisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeFavorisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
