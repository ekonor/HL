import { Component, OnInit } from '@angular/core';
import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ArenaType } from 'app/arenas/shared/arena-type';
import { City } from 'app/core/geo/city';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AlertService } from 'app/components/alert/alert.service';
import { Point } from 'app/shared/map/point';
// import { debounce } from 'rxjs/operator/debounce';
// import {Observable} from 'rxjs/Observable';
// import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

@Component({
  moduleId: module.id,
  selector: 'arena-id',
  templateUrl: 'arena-create.component.html',
  styleUrls: ['arena-create.component.scss']
})
export class ArenaCreateComponent implements OnInit {
  arena: ArenaViewItem;
  returnUrl: string;
  loading = false;
  id: number;
  mapPoint: Point;
  // private sub: any;
  arenaTypes: ArenaType[];
  // cities: City[];
  errorMessage: string;
  city: City;
//  searching = false;

  constructor( private service: ArenaService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.loading = true;
    this.arena = new ArenaViewItem;
    this.city = new City;
    this.mapPoint = this.getMapPoint(this.arena);
    console.log(this.arena);
    this.loading = false;
    this.getArenaTypes();
  }

  ngOnInit() {
  }

  private getMapPoint(arena: ArenaViewItem): Point {
    if (this.arena && this.arena.coordinates.latitude && this.arena.coordinates.longitude) {
      return {latitude: this.arena.coordinates.latitude, longitude: this.arena.coordinates.longitude};
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

  public addArena(arena: ArenaViewItem) {
    if (!this.city && !this.city.id) {
      this.alertService.error("Не удалось сохранить изменения");
      return;
    }
    this.arena.city = this.city;
    console.log(this.arena);
    console.log(this.id);
    this.service.addArena(this.arena).subscribe(
      data => {
        //this.router.navigate(['/arenas']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось добавить арену");
        this.loading = false;
      });
  }

  private setCity(city: City) {
    if (city && city.id) {
      this.city = city;
    }
  }
}
