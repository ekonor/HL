import { TestBed, inject } from '@angular/core/testing';

import { ArenaIdService } from './arena-id.service';

describe('ArenaIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArenaIdService]
    });
  });

  it('should ...', inject([ArenaIdService], (service: ArenaIdService) => {
    expect(service).toBeTruthy();
  }));
});
