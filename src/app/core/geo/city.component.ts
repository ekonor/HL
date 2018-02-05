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

import { City } from 'app/core/geo/city';
import { CityService } from 'app/core/geo/city.service';

@Component({
  selector: 'app-city-filter',
  templateUrl: 'city.component.html'
})

@Injectable()
export class CityComponent implements OnInit {

  @Input() city: City;
  @Output() onChanged = new EventEmitter<City>();

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.service.getCities(term)
          .do(() => { this.searchFailed = false; } )
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);
  formatter = (x: {name: string}) => x.name;

  constructor( private service: CityService) {
  }

  ngOnInit() {
    if (!this.city) { this.city = new City; }
  }

  returnCity() {
    if (this.city && this.city.id) {
      this.onChanged.emit(this.city);
    }
  }
}
