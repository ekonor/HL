import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { NgForm} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { TournamentAnnouncement } from 'app/tournament-announcements/shared/tournament-announcement';
import { Item } from 'app/tournament-announcements/shared/item';
import { City } from 'app/core/geo/city';
import { AlertService } from 'app/components/alert/alert.service';
import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { Arena } from 'app/arenas/shared/arena';



@Component({
  moduleId: module.id,
  selector: 'ta-create',
  templateUrl: 'ta-create.component.html'
})
export class TACreateComponent implements OnInit {
  ta: TournamentAnnouncement;
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

  startDate: string;
  endDate: string;
  endRegistrationDate: string;

  constructor( private service: TournamentAnnouncementsService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.dataIsLoading = true;
    this.ta = new TournamentAnnouncement;
    this.getAgeTypes();
    this.getGenderTypes();
    this.getCostTypes();
    this.getIsCommercialTypes();
    this.getCloseTypes();
    this.dataIsLoading = false;
  }

  ngOnInit() {
  }

  // сохранение как черновик
  public addTournamentAnnouncement(ta: TournamentAnnouncement, form: NgForm) {
    //if (form.) console.log("ok") else console.log("bad");
    if (confirm('Вы действительно хотите сохранить анонс?')) {
      // TODO проверка существования города и арены
      this.getDt();
      if (!this.ta.isCommercial) {
        this.ta.cost = null;
        this.ta.costType = null;
      }
      this.dataIsLoading = true;
      this.service.addTournamentAnnouncement(this.ta).subscribe(
        data => {
          this.router.navigate(['/profile']);
        },
        error => {
          this.alertService.error(error);
          this.alertService.error('Не удалось добавить анонс турнира');
          this.dataIsLoading = false;
          alert('Не удалось сохранить анонс турнира');
        },
        () => {
          this.dataIsLoading = false;
          alert('Анонс турнира сохранен успешно. Сейчас Вы будете перенаправлены в профиль.');
          this.router.navigate(['/profile']);
        });
      this.dataIsLoading = false;
      }
    this.dataIsLoading = false;
    }

  public viewList() {
    if (confirm('Вы действительно хотите отменить изменения и вернуться в профиль?')) {
      this.router.navigate(['/profile']);
    }
  }
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
    this.closeTypes.push(new Item({value: null, name: ''}));
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
      this.ta.cityId = city.id;
      this.city = city;
    } /*else {
      this.ta.cityId = null;
      this.city = null;
      this.arena = null;
      this.ta.arenaId = null;
    }*/
  }

  private setArena(arena: ArenaListItem) {
    if (arena && arena.id) {
      this.arena = arena; //new Arena({ id: this.arena.id, name: this.arena.name });
      this.ta.arenaId = arena.id;
    } /*else {
      this.arena = null;
      this.ta.arenaId = null;
    }*/
  }

  /*private setDt() {
    if (this.ta != null) {
      if (this.ta.startDate) {
        this.startDate = this.service.getYYYYMMDD(this.ta.startDate);
      }
      if (this.ta.endDate) {
        this.endDate = this.service.getYYYYMMDD(this.ta.endDate);
      }
      if (this.ta.endRegistrationDate) {
        this.endRegistrationDate = this.service.getYYYYMMDD(this.ta.endRegistrationDate);
      }
    }
  }*/

  private getDt() {
    if (this.ta != null) {
      if (this.startDate) {
        this.ta.startDate = new Date(this.startDate);
      }
      if (this.endDate) {
        this.ta.endDate = new Date(this.endDate);
      }
      if (this.endRegistrationDate) {
        this.ta.endRegistrationDate = new Date(this.endRegistrationDate);
      }
    }
  }

  private onChangedStartDt(dt: Date) {
    this.ta.startDate = dt;
  }

  private onChangedEndDt(dt: Date) {
    this.ta.endDate = dt;
  }

  private onChangedEndRegDt(dt: Date) {
    this.ta.endRegistrationDate = dt;
  }

  onSubmit(form: NgForm){
    console.log(form);
  }
}
