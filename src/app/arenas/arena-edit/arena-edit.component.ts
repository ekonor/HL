import { Component, OnInit } from '@angular/core';
import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ArenaType } from "app/arenas/shared/arena-type";
import { City } from "app/core/geo/city";
import { ActivatedRoute, Router } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import  { AlertService } from 'app/components/alert/alert.service';
import { Point } from "app/shared/map/point";
import { debounce } from "rxjs/operator/debounce";
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';


// import {Component, Injectable} from '@angular/core';
// import {HttpClient, HttpParams} from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
// import {of} from 'rxjs/observable/of';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/merge';

@Component({
  moduleId: module.id,
  selector: 'arena-id',
  templateUrl: 'arena-edit.component.html',
  // styleUrls: [ "../../../node_modules/bootstrap/dist/css/bootstrap.css" ]
  styleUrls: ['arena-edit.component.scss']
})

export class ArenaEditComponent implements OnInit {
  arena: ArenaViewItem;
  returnUrl: string;
  loading = false;
  id: number;
  deleteFlag: boolean;
  mapPoint: Point;
  // private sub: any;
  arenaTypes: ArenaType[];
  cities: City[];
  files: any;
  errorMessage: string;

  city: City;
  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;

  constructor( private service: ArenaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService ) {
    // Получаем id из url.
    // Url вида ...edit/21, где 21 - это id.
    // В роутинге должно быть прописано так edit/:id
    // this.id = this.activatedRoute.snapshot.params['id'];
    // console.log('id='+this.id+'route='+this.activatedRoute.snapshot.params['id']);
    this.arena = new ArenaViewItem;
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.loading = true;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getArena(this.id);
    this.getArenaTypes();
    this.deleteFlag = false;
    /*this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getArena(this.id);
    });*/

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.service.getCities(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

  private getMapPoint(arena: ArenaViewItem): Point {
    if (this.arena && this.arena.coordinates && this.arena.coordinates.latitude && this.arena.coordinates.longitude) {
      return {latitude: this.arena.coordinates.latitude, longitude: this.arena.coordinates.longitude};
    }
  }
  formatter = (x: {name: string}) => x.name;

  public editArena(arena: ArenaViewItem) {
    if (!this.city && !this.city.id) {
      this.alertService.error("Не удалось сохранить изменения");
      return;
    }
    this.arena.city = this.city;
    console.log(this.arena);
    console.log(this.id);
    console.log('ok');
    this.service.updateArena(this.id, this.arena).subscribe(
      data => {

      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось сохранить изменения");
        this.loading = false;
      });
    this.updateLogo();
  }

  public updateLogo() {
    if (this.files) {
      const formData = new FormData();
      formData.append('image', this.files[0]);
      if (this.arena.logo != null) {
      this.service.deleteLogo(this.id).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
      }
      this.service.addLogo(this.id, formData).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
    }
  }

  private getArenaTypes() {
    this.loading = true;
    this.service.getArenaTypes()
      .subscribe(
        arenaTypes => {
          let emptyValue: ArenaType = {id: null, name: "Тип арены не задан"};
          this.arenaTypes = new Array<ArenaType>();
          this.arenaTypes.push(emptyValue);
          this.arenaTypes = this.arenaTypes.concat(arenaTypes);
          this.loading = false;
        },
        error => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
  }

  // private getCities() {
  //   this.loading = true;
  //   this.service.getCities('*')
  //     .subscribe(
  //       cities => {
  //         let emptyValue: City = {id: null, name: "Город не указан", countryId: null};
  //         this.cities = new Array<City>();
  //         this.cities.push(emptyValue);
  //         this.cities = this.cities.concat(cities);
  //         console.log(cities);
  //         this.loading = false;
  //       },
  //       error => {
  //         this.errorMessage = error;
  //         this.loading = false;
  //       }
  //     );
  // }

  public setDeleteFlag() {
    console.log(this.deleteFlag);
  }

  public addLogo(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
    console.log(this.files);
  }

  public getArenaLogo(arena: ArenaViewItem): string {
    return this.service.getArenaLogo(arena);
  }

  public editLogo(){
    this.router.navigate([ "arena", "logo", this.arena.id ]);
  }

  public deleteArena() {
    console.log(this.arena);
    console.log(this.id);
    console.log('delete');
    this.service.deleteArena(this.id).subscribe(
      data => {
        //this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось удалить арену");
        this.loading = false;
      });
  }

  private getArena(id: number) {
    this.loading = true;
    this.service.getArena(id)
      .subscribe(
        arena => {
          this.arena = arena;
          this.mapPoint = this.getMapPoint(arena);
          this.city = this.arena.city;
          console.log(this.arena);
          this.loading = false;
        },
        error => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
  }
}
