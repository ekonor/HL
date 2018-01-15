import { Component, OnInit } from '@angular/core';
import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ArenaType } from 'app/arenas/shared/arena-type';
import { City } from 'app/core/geo/city';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import  { AlertService } from 'app/components/alert/alert.service';
import { Point } from 'app/shared/map/point';
import { debounce } from 'rxjs/operator/debounce';

@Component({
  moduleId: module.id,
  selector: 'arena-id',
  templateUrl: 'arena-create.component.html',
  // styleUrls: [ "../../../node_modules/bootstrap/dist/css/bootstrap.css" ]
  styleUrls: ['arena-create.component.scss']
})
export class ArenaCreateComponent implements OnInit {
  arena: ArenaViewItem;
  returnUrl: string;
  loading = false;
  id: number;
  deleteFlag: boolean;
  mapPoint: Point;
  // private sub: any;
  arenaTypes: ArenaType[];
  cities: City[];
  errorMessage: string;

  constructor( private service: ArenaService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.loading = true;
    this.arena = new ArenaViewItem;
    this.mapPoint = this.getMapPoint(this.arena);
    console.log(this.arena);
    this.loading = false;
    this.getArenaTypes();
    this.getCities();
  }

  ngOnInit() {
  }

  private getMapPoint(arena: ArenaViewItem): Point {
    if (this.arena && this.arena.coordinates.latitude && this.arena.coordinates.longitude) {
      return {latitude: this.arena.coordinates.latitude, longitude: this.arena.coordinates.longitude};
    }
  }

  public addArena(arena: ArenaViewItem) {
    console.log(this.arena);
    console.log(this.id);
    this.service.addArena(this.arena).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось добавить арену");
        this.loading = false;
      });
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
  /* Перевод выбранного текста Тип арены в айди*/
  // private setArenaTypeId() {
  //   let find = false;
  //   let i = this.arenaTypes.length;
  //   while (i--) {
  //     if (this.arenaTypes[i].name === this.arena.arenaTypeName) {
  //       this.arenaTypeId = this.arenaTypes[i].id;
  //       find = true;
  //     }
  //   }
  //   if (!find) {
  //     console.log('error');
  //     this.arenaTypeId = null;
  //   }
  // }

  /* Перевод выбранного текста Город в айди*/
  /*private setCityId() {
    let find = false;
    let i = this.cities.length;
    while (i--) {
      if (this.cities[i].name === this.arena.cityName) {
        this.cityId = this.cities[i].id;
        find = true;
      }
    }
    if (!find) {
      console.log('error');
      this.cityId = null;
    }
  }*/

  private getCities() {
    this.loading = true;
    this.service.getCities("*")
      .subscribe(
        cities => {
          let emptyValue: City = {id: null, name: 'Город не указан'};
          this.cities = new Array<City>();
          this.cities.push(emptyValue);
          this.cities = this.cities.concat(cities);
          this.loading = false;
        },
        error => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
  }

}
