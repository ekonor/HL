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
import { RefereeService } from 'app/referees/shared/referee.service';
import { RefereeListItem } from 'app/referees/shared/referee-list-item';
import { ListInfo, SortDir } from 'app/shared/list/list-info';
import { RefereeFilter } from 'app/referees/shared/referee-filter';

@Component({
  selector: 'referee-select',
  templateUrl: 'referee-select.component.html'
})

@Injectable()
export class RefereeSelectComponent implements OnInit {

  @Input() referee: RefereeListItem;
  @Input() cityId: number;
  @Input() isRequired: boolean = false;
  @Input() showRefereeTitle: boolean = true;
  @Output() onChanged = new EventEmitter<RefereeListItem>();

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;

  searchReferee = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.service.getReferees(this.cityId ? new RefereeFilter({searchText: term, cityId: this.cityId}) : new RefereeFilter({searchText: term}), new ListInfo({skip: 0, take: 10, orderBy: 'Name', orderDir: SortDir.Asc})) // TODO исправить листинфо - не работает
          .map((res) => { this.searchFailed = false; console.log(res.listItems);  return res.listItems; } )
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

  formatter = (x: {name: string}) => x.name;

  constructor( private service: RefereeService) {
  }

  ngOnInit() {
  }

  returnReferee() {
    if (this.referee && this.referee.id) {
      this.onChanged.emit(this.referee);
    } else {
      this.onChanged.emit(null);
    }
  }

  getRefereeTitle() {
    return this.isRequired ? 'Судья *' : 'Судья';
  }
}
