import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
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

import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  moduleId: module.id,
  selector: 'arena-create-fast',
  templateUrl: 'arena-create-fast.component.html'
})

@Injectable()
export class ArenaCreateFastComponent implements OnInit {
  @Input() isDisabled: boolean;
  @Output() onChanged = new EventEmitter<ArenaViewItem>();
  arena: ArenaViewItem;
  returnUrl: string;
  dataIsLoading: boolean;
  id: number;
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

  public addArena() {
    if (!this.city && !this.city.id) {
      this.alertService.error('Не удалось сохранить изменения');
      return;
    }
    this.arena.city = this.city;
    this.dataIsLoading = true;
    this.service.addArenaDraft(this.arena).subscribe(
      data => {
      },
      error => {
        this.alertService.error(error);
        this.alertService.error('Не удалось создать арену');
        this.dataIsLoading = false;
        alert('Не удалось создать арену');
      },
      () => {
        this.dataIsLoading = false;
        alert('Арена создана успешно. Теперь Вы можете добавить ее в список через поиск арен');
        this.arena = null;
        //this.toggledNewArena = false;
      });
    this.dataIsLoading = false;
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

  open(content) {
    this.modalRef = this.modalService.open(content);
  }

  close() {
    this.modalRef.close();
  }

  save() {
    console.log('save');
    //this.addArena();
    this.onChanged.emit(this.arena);
    this.modalRef.close();
  }
}
