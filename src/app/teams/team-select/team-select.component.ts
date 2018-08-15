import { Component, Injectable, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { TeamService } from 'app/teams/shared/team.service';

import { City } from 'app/core/geo/city';
import { TeamFilter } from 'app/teams/shared/team-filter';
import { Team } from 'app/teams/shared/team';
import { ListInfo, SortDir } from 'app/shared/list/list-info';

@Component({
  selector: 'team-select',
  templateUrl: 'team-select.component.html'
})

@Injectable()
export class TeamSelectComponent implements OnInit {

  @Input() team: Team;
  @Input() cityId: number;
  @Input() isRequired: boolean = false;
  @Input() showTeamTitle: boolean = true;
  @Output() onChanged = new EventEmitter<Team>();

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;

  searchTeam = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.service.getTeams(this.cityId ? new TeamFilter({searchText: term, cityId: this.cityId}) : new TeamFilter({searchText: term}), new ListInfo({skip: 0, take: 10, orderBy: 'Name', orderDir: SortDir.Asc})) // TODO исправить листинфо - не работает
          .map((res) => { this.searchFailed = false; console.log(res.listItems);  return res.listItems; } )
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

  formatter = (x: {name: string}) => x.name;

  constructor( private service: TeamService) {
  }

  ngOnInit() {
  }

  returnTeam() {
    if (this.team && this.team.id) {
      this.onChanged.emit(this.team);
    }
    else {
      this.onChanged.emit(null);
    }
  }
}
