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
  @Output() onChanged = new EventEmitter<ArenaListItem>();

  city: City;

  filter: ArenaFilter = new ArenaFilter();
  listInfo: ListInfo = new ListInfo();
  //sortOptions: SortOption[] = new Array<SortOption>();
  //pageSize: number;

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;

  searchArena = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.service.getArenas(new ArenaFilter({searchText: term}), new ListInfo({skip: 0, take: 10, orderBy: 'Name', orderDir: SortDir.Asc})) // TODO исправить листинфо - не работает
          .map((res) => { this.searchFailed = false; console.log(res.listItems);  return res.listItems; } )
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

  /*searchCity = (text$: Observable<string>) =>
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
      .merge(this.hideSearchingWhenUnsubscribed);*/

  formatter = (x: {name: string}) => x.name;

  constructor( private service: ArenaService) {

    this.listInfo = new ListInfo();
    this.listInfo.orderBy = 'Name';
    this.listInfo.skip = 0;
    this.listInfo.take = 10;
    this.listInfo.orderDir = SortDir.Asc;
  }

  ngOnInit() {
    /*if (!this.city) {
      this.city = new City;
    } else {
      this.city = this.arena.city;
    }
    if (!this.city) {
      this.city = new City;
    }*/
  }

  returnArena() {
    /*if (this.arena && this.arena.id) {
      if (this.arena.city) {
          this.city = this.arena.city;
      }
      this.onChanged.emit(this.arena);
    }*/
  }

  /*updateCountry() {
    if (this.country && this.country.id) {
      if (this.city && this.city.country) {
        if (this.city.country.name !== this.country.name) {
          this.city = new City;
        }
      }
    } else {
      this.city = new City;
      // this.country = new Country;
    }
  }*/

  /*getArenas(term: string): Observable<ListResponse<ArenaListItem>> {
    //const filter = new ArenaFilter({searchText: searchTerm});
    //const listInfo = new ListInfo({skip: 0, take: 10, orderBy: 'Name', orderDir: SortDir.Asc});
    if (searchTerm === '') {
      return of([]);
    }
    const filter = new ArenaFilter({searchText: term});
    let listInfo = new ListInfo();
    listInfo.orderBy = 'Name';
    listInfo.skip = 0;
    listInfo.take = 10;
    listInfo.orderDir = SortDir.Asc;
    return this.service.getArenas(filter,listInfo);
  }*/
}
