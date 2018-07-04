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
import { SchoolService } from 'app/schools/shared/school.service';
import { SchoolListItem } from 'app/schools/shared/school-list-item';
import { ListInfo, SortDir } from 'app/shared/list/list-info';
import { SchoolFilter } from 'app/schools/shared/school-filter';

@Component({
  selector: 'school-select',
  templateUrl: 'school-select.component.html'
})

@Injectable()
export class SchoolSelectComponent implements OnInit {

  @Input() school: SchoolListItem;
  @Input() cityId: number;
  @Input() isRequired: boolean = false;
  @Output() onChanged = new EventEmitter<SchoolListItem>();

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;

  searchSchool = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.service.getSchools(this.cityId ? new SchoolFilter({searchText: term, cityId: this.cityId}) : new SchoolFilter({searchText: term}), new ListInfo({skip: 0, take: 10, orderBy: 'Name', orderDir: SortDir.Asc})) // TODO исправить листинфо - не работает
          .map((res) => { this.searchFailed = false; console.log(res.listItems);  return res.listItems; } )
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

  formatter = (x: {name: string}) => x.name;

  constructor( private service: SchoolService) {
  }

  ngOnInit() {
  }

  returnSchool() {
    if (this.school && this.school.id) {
      this.onChanged.emit(this.school);
    }
  }

  getSchoolTitle() {
    return this.isRequired ? 'Школа *' : 'Школа';
  }
}
