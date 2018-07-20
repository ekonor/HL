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

import { SchoolService } from 'app/schools/shared/school.service';
import { SchoolFilter } from 'app/schools/shared/school-filter';
import { SchoolType } from 'app/schools/shared/school-type';
import { City } from 'app/core/geo/city';

@Component({
  moduleId: module.id,
  selector: 'school-filter',
  templateUrl: 'school-filter.component.html'
})

@Injectable()
export class SchoolFilterComponent implements OnInit {

  @Input() filter: SchoolFilter;
  @Output() onFiltered = new EventEmitter<SchoolFilter>();

  schoolTypes: SchoolType[];
  errorMessage: string;
  toggled: boolean;

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;
  city: City;

  constructor( private service: SchoolService) {

  }

  ngOnInit() {
    const filterState = JSON.parse(localStorage.getItem('schoolFilterState'));
    // TODO проверка существования поля toggled
    this.toggled = filterState && filterState.toggled;

    const filter = JSON.parse(localStorage.getItem('schoolFilter'));
    const filterCity = JSON.parse(localStorage.getItem('schoolFilterCity'));
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
      this.filter = new SchoolFilter();
      this.city = new City();
    }
  }

  public toggle() {

    this.toggled = !this.toggled;
    localStorage.setItem('schoolFilterState', JSON.stringify({toggled: this.toggled}));
  }

  search() {
    if (this.city && this.city.id) {
      this.filter.cityId = this.city.id;
    }
    localStorage.setItem('schoolFilter', JSON.stringify(this.filter));
    localStorage.setItem('schoolFilterCity', JSON.stringify(this.city));
    this.onFiltered.emit(this.filter);
  }

  reset() {
    this.filter = new SchoolFilter();
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
