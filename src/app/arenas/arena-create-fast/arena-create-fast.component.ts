import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ArenaType } from 'app/arenas/shared/arena-type';
import { City } from 'app/core/geo/city';
import { AlertService } from 'app/components/alert/alert.service';
import { Point } from 'app/shared/map/point';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';



@Component({
  moduleId: module.id,
  selector: 'arena-create-fast',
  templateUrl: 'arena-create-fast.component.html'
})

@Injectable()
export class ArenaCreateFastComponent implements OnInit {
  arena: ArenaViewItem;
  returnUrl: string;
  dataIsLoading: boolean;
  id: number;
  // mapPoint: Point;
  // private sub: any;
  arenaTypes: ArenaType[];
  errorMessage: string;
  city: City;

  closeResult: string;
  private modalRef: NgbModalRef;
  constructor( private service: ArenaService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService,
               private modalService: NgbModal ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.dataIsLoading = true;
    this.arena = new ArenaViewItem;
    this.city = new City;
    // this.mapPoint = this.getMapPoint(this.arena);
    this.dataIsLoading = false;
    this.getArenaTypes();
  }

  ngOnInit() {
  }

  /* private getMapPoint(arena: ArenaViewItem): Point {
    if (this.arena && this.arena.coordinates.latitude && this.arena.coordinates.longitude) {
      return {latitude: this.arena.coordinates.latitude, longitude: this.arena.coordinates.longitude};
    }
  }*/

  public addArena(arena: ArenaViewItem) {
    if (!this.city && !this.city.id) {
      this.alertService.error("Не удалось сохранить изменения");
      return;
    }
    this.arena.city = this.city;
    this.dataIsLoading = true;
    this.service.addArena(this.arena).subscribe(
      data => {
        this.router.navigate(['/arenas']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось добавить арену");
        this.dataIsLoading = false;
      });
  }

  open(content) {
    /*this.modalService.open(content,  { }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modalRef = result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });*/

    this.modalRef = this.modalService.open(content);
    this.modalService.open(content,  { }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public getAddIconClass() {
    return this.service.getAddIconClass();
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

  private setCity(city: City) {
    if (city && city.id) {
      this.city = city;
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
