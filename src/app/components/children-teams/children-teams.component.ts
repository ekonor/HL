import { Component, OnInit } from '@angular/core';
import { ChildrenTeam } from './teams';
import {ChildrenTeamsService} from './children-teams.service';
@Component({
  selector: 'app-children-teams',
  templateUrl: './children-teams.component.html',
  styleUrls: ['./children-teams.component.scss'],
  providers: [ChildrenTeamsService]
})
export class ChildrenTeamsComponent implements OnInit {
  title = 'Детские клубы и команды';

  constructor(private _childrenteamsService: ChildrenTeamsService) {}

  getChildrenTeams() {
    this._childrenteamsService.getChildrenTeams().then(childrenteams => this.childrenteams = childrenteams);
  }

  ngOnInit() {
    this.getChildrenTeams();
  }


childrenteams: ChildrenTeam [];
}

