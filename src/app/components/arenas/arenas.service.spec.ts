import { TestBed, inject } from '@angular/core/testing';

import { ArenasService } from './arenas.service';

describe('ArenasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArenasService]
    });
  });

  it('should ...', inject([ArenasService], (service: ArenasService) => {
    expect(service).toBeTruthy();
  }));
});
