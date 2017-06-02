import { CHILDRENTEAMS } from './mock-teams';
import { Injectable } from '@angular/core';

@Injectable()
export class ChildrenTeamsService {

  getChildrenTeams() {

    return Promise.resolve(CHILDRENTEAMS);
  }
  constructor() { }

}
