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
import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { City } from 'app/core/geo/city';
import {TournamentAnnouncementFilter} from 'app/tournament-announcements/shared/tournament-announcement-filter';

@Component({
  //moduleId: module.id,
  selector: 'tournament-announcement-filter',
  templateUrl: 'tournament-announcement-filter.component.html',
  styleUrls: ['tournament-announcement-filter.component.scss']
})

@Injectable()
export class TournamentAnnouncementFilterComponent implements OnInit {

  @Input() filter: TournamentAnnouncementFilter;
  @Output() onFiltered = new EventEmitter<boolean>();

  errorMessage: string;
  toggled: boolean;
  state: string;

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;
  city: City;

  constructor( private service: TournamentAnnouncementsService) {
    const filterState = JSON.parse(localStorage.getItem('tournamentAnnouncementFilterFilterState'));
    // TODO проверка существования поля toggled
    this.toggled = filterState && filterState.toggled;
  }

  ngOnInit() {
     this.city = new City;
  }
  public toggle() {
    this.toggled = !this.toggled;
    console.log(this.toggled);
    localStorage.setItem('tournamentAnnouncementFilterFilterState', JSON.stringify({toggled: this.toggled}));
  }

  private setCity(city: City) {
    if (city && city.id) {
      this.city = city;
    }
  }

  search() {
    if (this.city && this.city.id) {
      this.filter.cityId = this.city.id;
    }
    this.onFiltered.emit();
  }

  public getToggleIcon() {
    if (this.toggled) {
      return 'fa fa-angle-down';
    } else {
      return 'fa fa-angle-up';
    }
  }
}
