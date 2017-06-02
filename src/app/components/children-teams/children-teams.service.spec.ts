import { TestBed, inject } from '@angular/core/testing';

import { ChildrenTeamsService } from './children-teams.service';

describe('ChildrenTeamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildrenTeamsService]
    });
  });

  it('should ...', inject([ChildrenTeamsService], (service: ChildrenTeamsService) => {
    expect(service).toBeTruthy();
  }));
});
