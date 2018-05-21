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

/*Date.prototype.yyyymmdd = function() {
  let mm = this.getMonth() + 1; // getMonth() is zero-based
  let dd = this.getDate();

  return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('');
};*/

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
  deleteFlag: boolean;
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

  files: any;

  startDate: string;
  endDate: string;
  endRegistrationDate: string;

  constructor( private service: TournamentAnnouncementsService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    //this.ta = new TournamentAnnouncement;
    this.dataIsLoading = true;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getTA(this.id);
    this.getAgeTypes();
    this.getGenderTypes();
    this.getCostTypes();
    this.getIsCommercialTypes();
    this.getCloseTypes();
    this.dataIsLoading = false;
    this.deleteFlag = false;
  }

  ngOnInit() {
  }

  public addLogo(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
    // console.log(this.files);
  }

  public deleteTA() {
    if (confirm('Вы действительно хотите удалить анонс?')) {
      console.log(this.ta);
      console.log(this.id);
      console.log('delete');
      this.dataIsLoading = true;
      this.service.deleteTournamentAnnouncement(this.id).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.alertService.error('Не удалось удалить анонс');
          alert('Не удалось удалить анонс турнира');
          this.dataIsLoading = false;
        },
        () => {
          this.dataIsLoading = false;
          alert('Анонс успешно удален. Вы будете перенаправлены на страницу профиля.');
          this.router.navigate(['/profile']);
        }
      );
    }
  }

  public updateTournamentAnnouncement(ta: TournamentAnnouncementViewItem) {
    if (confirm('Вы действительно хотите сохранить анонс как черновик?')) {
      if (this.updateTA()) {
        alert('Вы будете перенаправлены на страницу профиля');
        this.router.navigate(['/profile']);
      }
    }
  }

  public viewList() {
    if (confirm('Вы действительно хотите отменить изменения и вернуться в профиль?')) {
      this.router.navigate(['/profile']);
    }
  }

  public saveAndSendOnModeration() {
    if (confirm('Вы действительно хотите сохранить изменения и отправить анонс на модерацию? После отправки редактирование анонса станет недоступно')) {
      this.updateTA();
      this.sendOnModeration();
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

  public editLogo(){
    this.router.navigate([ "tournament-announcement", "logo", this.ta.id ]);
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
          });
      }
      this.service.addLogo(this.id, formData).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.dataIsLoading = false;
          alert('Не удалось обновить логотип');
        });
    }
    this.dataIsLoading = false;
  }

  public sendOnModeration() {
    this.service.sendOnModeration(this.ta.id).subscribe(
      data => {
      },
      error => {
        this.alertService.error(error);
        this.alertService.error('Не удалось отправить на модерацию анонс турнира');
        alert('Не удалось отправить анонс на модерацию');
      },
      () => {
        alert('Анонс успешно отправлен на модерацию, ожидайте решения модератора');
      });
  }

  public setDeleteFlag() {
    console.log(this.deleteFlag);
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
          //this.setDt();
        },
        error => {
          this.alertService.error(error);
          this.alertService.error('Не удалось получить анонс турнира');
          alert('Не удалось загрузить анонс. Вы будете перенаправлены на страницу профиля.');
          this.router.navigate(['/profile']);
          // this.router.navigate(['/not-found']);
        },
        () => this.dataIsLoading = false
      );
  }

  public getTournamentAnnouncementLogo(ta: TournamentAnnouncementViewItem): string {
    return this.service.getTournamentAnnouncementLogo(ta);
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
  }

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
  }*/

  private onChangedStartDt(dt: Date) {
    this.ta.startDate = dt;
  }

  private onChangedEndDt(dt: Date) {
    this.ta.endDate = dt;
  }

  private onChangedEndRegDt(dt: Date) {
    this.ta.endRegistrationDate = dt;
  }

  private updateTA(): boolean {
    this.dataIsLoading = true;
    //this.getDt();
    // ta.state = 'Draft';
    if (!this.ta.isCommercial) {
      this.ta.cost = null;
      this.ta.costType = null;
    }
    this.service.updateTournamentAnnouncement(this.ta).subscribe(
      data => {
        this.updateLogo();
      },
      error => {
        this.alertService.error(error);
        this.alertService.error('Не удалось обновить анонс турнира');
        alert('Не удалось обновить анонс турнира');
        this.dataIsLoading = false;
        return false;
      },
      () => {
        alert('Анонс успешно сохранен');
        this.dataIsLoading = false;
        return true;
        //this.router.navigate(['/profile']);
      }
    );
    return false;
  }
}
