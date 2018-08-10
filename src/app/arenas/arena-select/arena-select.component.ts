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
import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { ListInfo, SortDir } from 'app/shared/list/list-info';
import { ArenaFilter } from 'app/arenas/shared/arena-filter';

@Component({
  selector: 'arena-select',
  templateUrl: 'arena-select.component.html'
})

@Injectable()
export class ArenaSelectComponent implements OnInit {

  @Input() arena: ArenaListItem;
  @Input() cityId: number;
  @Input() isRequired: boolean = false;
  @Output() onChanged = new EventEmitter<ArenaListItem>();

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;

  searchArena = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.service.getArenas(this.cityId ? new ArenaFilter({searchText: term, cityId: this.cityId}) : new ArenaFilter({searchText: term}), new ListInfo({skip: 0, take: 10, orderBy: 'Name', orderDir: SortDir.Asc})) // TODO исправить листинфо - не работает
          .map((res) => { this.searchFailed = false; console.log(res.listItems);  return res.listItems; } )
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

  formatter = (x: {name: string}) => x.name;

  constructor( private service: ArenaService) {
  }

  ngOnInit() {
  }

  returnArena() {
    if (this.arena && this.arena.id) {
      this.onChanged.emit(this.arena);
    }
    else {
      this.onChanged.emit(null);
    }
  }
}
