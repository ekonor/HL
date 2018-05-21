import { Component, OnInit } from '@angular/core';
import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { TournamentAnnouncementViewItem } from 'app/tournament-announcements/shared/tournament-announcement-view-item';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AlertService } from 'app/components/alert/alert.service';
import { debounce } from "rxjs/operator/debounce";

@Component({
  moduleId: module.id,
  selector: 'ta-id',
  templateUrl: 'ta-logo.component.html',
  styleUrls: ['ta-logo.component.scss']
})

export class TALogoComponent implements OnInit {
  ta: TournamentAnnouncementViewItem;
  returnUrl: string;
  id: number;
  deleteFlag: boolean;
  files: any;
  errorMessage: string;
  dataIsLoading: boolean;

  constructor( private service: TournamentAnnouncementsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getTA(this.id);
    this.deleteFlag = false;
  }

  ngOnInit() {

  }

  public updateLogo() {
    if (this.files) {
      const formData = new FormData();
      formData.append('image', this.files[0]);
      console.log(this.files[0]);
      this.dataIsLoading = true;
      this.service.addLogo(this.id, formData).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          alert('Не удалось загрузить изображение');
          this.dataIsLoading = false;
        },
        () => {
          alert('Изображение успешно загружено');
          this.dataIsLoading = false;
        });
    }
    this.dataIsLoading = false;
  }

  public deleteLogo() {
    console.log('delete');
    this.dataIsLoading = true;
    this.service.deleteLogo(this.id).subscribe(
      data => {
        this.getTA(this.id);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось удалить logo");
      },
      () => this.dataIsLoading = false
    );
  }

  public setDeleteFlag() {
    console.log(this.deleteFlag);
  }

  public addLogo(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }

  public getTournamentAnnouncementLogo(ta: TournamentAnnouncementViewItem): string {
    return this.service.getTournamentAnnouncementLogo(ta);
  }

  private getTA(id: number) {
    this.dataIsLoading = true;
    this.service.getTournamentAnnouncement(id)
      .subscribe(
        ta => {
          this.ta = ta;
          console.log(this.ta);
        },
        error => {
          this.errorMessage = error;
        },
        () => this.dataIsLoading = false
      );
  }
}
