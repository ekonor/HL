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

import {TeamService } from 'app/teams/shared/team.service';
import { TeamFilter } from 'app/teams/shared/team-filter';
// import { ArenaType } from 'app/arenas/shared/arena-type';
import { City } from 'app/core/geo/city';

@Component({
  moduleId: module.id,
  selector: "team-filter",
  templateUrl: "team-filter.component.html"
})

@Injectable()
export class TeamFilterComponent implements OnInit {

  @Input() filter: TeamFilter;
  @Output() onFiltered = new EventEmitter<TeamFilter>();

  // teamTypes: TeamType[];
  errorMessage: string;
  toggled: boolean;

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;
  city: City;

  constructor( private service: TeamService) {

  }

  ngOnInit() {
    // this.getTeamTypes();
    const filterState = JSON.parse(localStorage.getItem('teamFilterState'));
    // TODO проверка существования поля toggled
    this.toggled = filterState && filterState.toggled;

    const filter = JSON.parse(localStorage.getItem('teamFilter'));
    const filterCity = JSON.parse(localStorage.getItem('teamFilterCity'));
    if (filter) {
      this.filter = filter;
      if (filterCity) {
        this.setCity(filterCity);
        if (this.city && this.city.id) {
          this.filter.cityId = this.city.id;
        }
      }
      this.onFiltered.emit(this.filter);
    } else {
      this.filter = new TeamFilter();
      this.city = new City();
    }
  }

  /* private getTeamTypes() {
    this.service.getTeamTypes()
    .subscribe(
      teamTypes => {
        let emptyValue : TeamType = { id: null, name: "Выберите тип команды" };
        this.teamTypes = new Array<TeamType>();
        this.teamTypes.push(emptyValue);
        this.teamTypes =  this.teamTypes.concat(teamTypes);
      },
      error => this.errorMessage = error
    );
  } */

  public toggle() {
    this.toggled = !this.toggled;
    localStorage.setItem('teamFilterState', JSON.stringify({toggled: this.toggled}));
  }

  search() {
    if (this.city && this.city.id) {
      this.filter.cityId = this.city.id;
    }
    localStorage.setItem('teamFilter', JSON.stringify(this.filter));
    localStorage.setItem('teamFilterCity', JSON.stringify(this.city));
    this.onFiltered.emit(this.filter);
  }

  reset() {
    this.filter = new TeamFilter();
    this.city = new City();
  }

  public getToggleIcon() {
    if (this.toggled) {
      return 'fa fa-angle-down';
    } else {
      return 'fa fa-angle-up';
    }
  }

  public getToggleTitle(toggled: boolean): string {
    if (toggled) {
      return 'Развернуть';
    } else {
      return 'Свернуть';
    }
  }

  private setCity(city: City) {
    if (city) {
      this.city = city;
    }
  }
}
