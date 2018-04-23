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
import { City } from 'app/core/geo/city';
import { AlertService } from 'app/components/alert/alert.service';
import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { Arena } from 'app/arenas/shared/arena';



@Component({
  moduleId: module.id,
  selector: 'ta-edit',
  templateUrl: 'ta-edit.component.html',
  styleUrls: ['ta-edit.component.scss']
})
export class TAEditComponent implements OnInit {
  ta: TournamentAnnouncementViewItem;
  returnUrl: string;
  dataIsLoading: boolean;
  id: number;
  // mapPoint: Point;
  // private sub: any;
  ageTypes: Array<Item>;
  genderTypes: Array<Item>;
  isCommercialTypes: Array<Item>;
  costTypes: Array<Item>;
  closeTypes: Array<Item>;
  errorMessage: string;
  city: City;
  arena: ArenaListItem;

  constructor( private service: TournamentAnnouncementsService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    //this.ta = new TournamentAnnouncement;
    this.dataIsLoading = true;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getTA(this.id);
    //this.city = new City();
    // this.arena = new Arena();

    this.getAgeTypes();
    this.getGenderTypes();
    this.getCostTypes();
    this.getIsCommercialTypes();
    this.getCloseTypes();
    this.dataIsLoading = false;
  }

  ngOnInit() {
  }

  public deleteTA() {
    console.log(this.ta);
    console.log(this.id);
    console.log('delete');
    this.dataIsLoading = true;
    this.service.deleteTournamentAnnouncement(this.id).subscribe(
      data => {
        this.router.navigate(['/tournaments']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось удалить анонс");
        this.dataIsLoading = false;
      });
  }

  private getTA(id: number) {
    this.dataIsLoading = true;
    this.service.getTournamentAnnouncement(id)
      .subscribe(
        ta => {
          this.ta = ta;
          this.arena = ta.arena;
          this.city = this.ta.city;
          if (this.city == null) { this.city = new City; }
        },
        error => {
          this.alertService.error(error);
          this.alertService.error("Не удалось изменить анонс турнира");
          // this.router.navigate(['/not-found']);
        },
        () => this.dataIsLoading = false
      );
  }

  /*public addTournamentAnnouncement(ta: TournamentAnnouncement) {
    this.service.addTournamentAnnouncement(this.ta).subscribe(
      data => {
        this.router.navigate(['/tournament-announcements']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось добавить анонс турнира");
        this.loading = false;
      });
  }*/

// TODO вынести в сервис
  private getAgeTypes() {
    this.ageTypes = new Array<Item>();
    this.ageTypes.push(new Item({value: 'Adults', name: 'Взрослые'}));
    this.ageTypes.push(new Item({value: 'Youth', name: 'Молодежь'}));
    this.ageTypes.push(new Item({value: 'Juniors', name: 'Юниоры'}));
    this.ageTypes.push(new Item({value: 'Kids', name: 'Дети'}));
  }

  private getCloseTypes() {
    this.closeTypes = new Array<Item>();
    this.closeTypes.push(new Item({value: 'ResponseCountAccomplished', name: 'Набор необходимого количества участников'}));
    this.closeTypes.push(new Item({value: 'EndRegistrationDatePassed', name: 'Окончание срока регистрации'}));
    this.closeTypes.push(new Item({value: 'ResponseCountAccomplishedAndEndRegistrationDatePassed', name: 'Набор участников и окончание срока регистрации'}));
  }

  private getGenderTypes() {
    this.genderTypes =  new Array<Item>();
    this.genderTypes.push(new Item({value: 'Male', name: 'Мужчины'}));
    this.genderTypes.push(new Item({value: 'Female', name: 'Женщины'}));
  }

  private getCostTypes() {
    this.costTypes = new Array<Item>();
    this.costTypes.push(new Item({value: 'PerPerson', name: 'С человека'}));
    this.costTypes.push(new Item({value: 'PerTeam', name: 'С команды'}));
  }

  private getIsCommercialTypes() {
    this.isCommercialTypes = new Array<Item>();
    this.isCommercialTypes.push(new Item({value: true, name: 'Да'}));
    this.isCommercialTypes.push(new Item({value: false, name: 'Нет'}));
  }
  private setCity(city: City) {
    if (city && city.id) {
      this.ta.city = city;
      this.city = city;
    }
  }

  private setArena(arena: ArenaListItem) {
    if (arena && arena.id) {
      this.arena = arena;
      this.ta.arena = arena;
    }
  }
}
