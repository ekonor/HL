import { Component, OnInit } from '@angular/core';
import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ArenaType } from "app/arenas/shared/arena-type";
import { City } from "app/core/geo/city";
import { ActivatedRoute, Router } from '@angular/router';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import  { AlertService } from 'app/components/alert/alert.service';
import { Point } from "app/shared/map/point";
// import { debounce } from "rxjs/operator/debounce";
// import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'arena-id',
  templateUrl: 'arena-edit.component.html'
})

export class ArenaEditComponent implements OnInit {
  arena: ArenaViewItem;
  returnUrl: string;
  id: number;
  deleteFlag: boolean;
  mapPoint: Point;
  arenaTypes: ArenaType[];
  files: any;
  errorMessage: string;
  city: City;
  dataIsLoading: boolean;

  constructor( private service: ArenaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService ) {
    //this.arena = new ArenaViewItem;
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.dataIsLoading = true;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getArena(this.id);
    this.dataIsLoading = false;
    this.getArenaTypes();
    this.deleteFlag = false;
  }

  ngOnInit() {

  }

  /*private getMapPoint(arena: ArenaViewItem): Point {
    if (this.arena && this.arena.coordinates && this.arena.coordinates.latitude && this.arena.coordinates.longitude) {
      return {latitude: this.arena.coordinates.latitude, longitude: this.arena.coordinates.longitude};
    }
  }*/

  public editArena(arena: ArenaViewItem) {
    if (!this.city && !this.city.id) {
      this.alertService.error("Не удалось сохранить изменения");
      return;
    }
    this.arena.city = this.city;
    this.dataIsLoading = true;
    this.service.updateArena(this.id, this.arena).subscribe(
      data => {
        this.router.navigate(['/arenas']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось сохранить изменения");
        this.dataIsLoading = false;
      });
    this.updateLogo();
  }

  public updateLogo() {
    if (this.files) {
      this.dataIsLoading = true;
      const formData = new FormData();
      formData.append('image', this.files[0]);
      if (this.arena.logo != null) {
      this.service.deleteLogo(this.id).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.dataIsLoading = false;
        },
        () => { this.dataIsLoading = false; } );
      }
      this.service.addLogo(this.id, formData).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.dataIsLoading = false;
        },
        () => { this.dataIsLoading = false; } );
    }
  }

  public deleteArena() {
    this.dataIsLoading = true;
    this.service.deleteArena(this.id).subscribe(
      data => {
        this.router.navigate(['/arenas']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось удалить арену");
        this.dataIsLoading = false;
      },
      () => { this.dataIsLoading = false; });
  }

  public setDeleteFlag() {
  }

  public addLogo(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }

  public getArenaLogo(arena: ArenaViewItem): string {
    return this.service.getArenaLogo(arena);
  }

  public editLogo(){
    this.router.navigate([ "arena", "logo", this.arena.id ]);
  }

  private getArenaTypes() {
    this.dataIsLoading = true;
    this.service.getArenaTypes()
      .subscribe(
        arenaTypes => {
          let emptyValue: ArenaType = {id: null, name: "Тип арены не задан"};
          this.arenaTypes = new Array<ArenaType>();
          this.arenaTypes.push(emptyValue);
          this.arenaTypes = this.arenaTypes.concat(arenaTypes);
          this.dataIsLoading = false;
        },
        error => {
          this.errorMessage = error;
          this.dataIsLoading = false;
        }
      );
  }

  private getArena(id: number) {
    this.dataIsLoading = true;
    this.service.getArena(id)
      .subscribe(
        arena => {
          this.arena = arena;
          //this.mapPoint = this.getMapPoint(arena);
          this.city = this.arena.city;
          if (this.city == null) { this.city = new City; }
          // this.dataIsLoading = false;
        },
        error => {
          this.errorMessage = error;
          this.router.navigate(['/not-found']);
        },
        () => this.dataIsLoading = false
      );
  }

  private setCity(city: City) {
    if (city && city.id) {
      this.city = city;
    }
  }
}
