import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { TournamentAnnouncementViewItem } from 'app/tournament-announcements/shared/tournament-announcement-view-item';
import { Item } from 'app/tournament-announcements/shared/item';
// import { ArenaType } from 'app/arenas/shared/arena-type';
import { City } from 'app/core/geo/city';
import { AlertService } from 'app/components/alert/alert.service';

// import { Point } from 'app/shared/map/point';



@Component({
  moduleId: module.id,
  selector: 'ta-create',
  templateUrl: 'ta-create.component.html',
  styleUrls: ['ta-create.component.scss']
})
export class TACreateComponent implements OnInit {
  ta: TournamentAnnouncementViewItem;
  returnUrl: string;
  loading = false;
  id: number;
  // mapPoint: Point;
  // private sub: any;
  ageTypes: Array<Item>;
  genderTypes: Array<Item>;
  errorMessage: string;
  city: City;

  constructor( private service: TournamentAnnouncementsService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.loading = true;
    this.ta = new TournamentAnnouncementViewItem;
    this.city = new City;
    // this.mapPoint = this.getMapPoint(this.arena);
    this.loading = false;
    this.getAgeTypes();
    this.getGenderTypes();
  }

  ngOnInit() {
  }

  /* private getMapPoint(arena: ArenaViewItem): Point {
    if (this.arena && this.arena.coordinates.latitude && this.arena.coordinates.longitude) {
      return {latitude: this.arena.coordinates.latitude, longitude: this.arena.coordinates.longitude};
    }
  }*/

  /* private getArenaTypes() {
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
  }*/

  public addTournamentAnnouncement(ta: TournamentAnnouncementViewItem) {
    /* if (!this.city && !this.city.id) {
      this.alertService.error("Не удалось сохранить изменения");
      return;
    } */
    // this.arena.city = this.city;
    // console.log(this.arena);
    // console.log(this.id);
    this.service.addTournamentAnnouncement(this.ta).subscribe(
      data => {
        this.router.navigate(['/tournament-announcements']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось добавить анонс турнира");
        this.loading = false;
      });
  }

  private getAgeTypes() {
    this.ageTypes = new Array<Item>();
    this.ageTypes.push(new Item({value: 'Adult', name: 'Взрослые'}));
    this.ageTypes.push(new Item({value: 'Youth', name: 'Молодежь'}));
    this.ageTypes.push(new Item({value: 'Juniors', name: 'Юниоры'}));
    this.ageTypes.push(new Item({value: 'Kids', name: 'Дети'}));
  }

  private getGenderTypes() {
    this.genderTypes =  new Array<Item>();
    this.genderTypes.push(new Item({value: 'Male', name: 'Мужчины'}));
    this.genderTypes.push(new Item({value: 'Female', name: 'Женщины'}));
  }

  private setCity(city: City) {
    if (city && city.id) {
      this.ta.city = city;
    }
  }
}
