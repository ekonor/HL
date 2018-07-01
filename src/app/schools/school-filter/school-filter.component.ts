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
  @Output() onFiltered = new EventEmitter<boolean>();

  schoolTypes: SchoolType[];
  errorMessage: string;
  toggled: boolean;

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;
  city: City;

  constructor( private service: SchoolService) {
    const filterState = JSON.parse(localStorage.getItem('schoolsFilterState'));
    // TODO проверка существования поля toggled
    this.toggled = filterState && filterState.toggled;
    console.log(this.toggled);
  }

  ngOnInit() {
    this.city = new City;
  }

  public toggle() {

    this.toggled = !this.toggled;
    console.log(this.toggled);
    localStorage.setItem('schoolsFilterState', JSON.stringify({toggled: this.toggled}));
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

  public getToggleTitle(toggled: boolean): string {
    if (toggled) {
      return 'Развернуть';
    } else {
      return 'Свернуть';
    }
  }

  private setCity(city: City) {
    if (city && city.id) {
      this.city = city;
    }
  }
}
