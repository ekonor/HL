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
import {Country} from "./country";

@Component({
  selector: 'app-city-filter',
  templateUrl: 'city.component.html'
})

@Injectable()
export class CityComponent implements OnInit {

  @Input() city: City;
  @Output() onChanged = new EventEmitter<City>();

  country: Country;

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;
  searchCity = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.service.getCities(term, this.country.id)
          .do(() => { this.searchFailed = false; } )
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

  searchCountry = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.service.getCountries(term)
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
    if (!this.city) {
      this.city = new City;
    }
    if (!this.country) {
      this.country = new Country;
    }
    // else {
    //   if (!this.country) {
    //     let countryId = this.city.countryId;
    //     this.service.getCountries(term)
    //   }
    // }
  }

  returnCity() {
    if (this.city && this.city.id) {
      this.onChanged.emit(this.city);
    }
  }
}
