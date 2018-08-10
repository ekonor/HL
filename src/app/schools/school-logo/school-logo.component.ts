import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'app/schools/shared/school.service';
import { SchoolViewItem } from 'app/schools/shared/school-view-item';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AlertService } from 'app/components/alert/alert.service';
import { debounce } from 'rxjs/operator/debounce';

@Component({
  moduleId: module.id,
  selector: 'school-logo',
  templateUrl: 'school-logo.component.html'
})

export class SchoolLogoComponent implements OnInit {
  school: SchoolViewItem;
  returnUrl: string;
  id: number;
  deleteFlag: boolean;
  files: any;
  errorMessage: string;
  dataIsLoading: boolean;

  constructor( private service: SchoolService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getSchool(this.id);
    this.deleteFlag = false;
  }

  ngOnInit() {

  }

  public updateLogo() {
    if (this.files) {
      this.deleteLogo();
      const formData = new FormData();
      formData.append('image', this.files[0]);
      this.dataIsLoading = true;
      this.service.addLogo(this.id, formData).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.dataIsLoading = false;
          alert('Не удалось обновить логотип');
        },
        () => {
          this.dataIsLoading = false;
          alert('Логотип успешно обновлен');
        }
      );
    }
  }

  public deleteLogo() {
    if (this.school.logo != null) {
      this.dataIsLoading = true;
      this.service.deleteLogo(this.id).subscribe(
        data => {
          this.getSchool(this.id);
        },
        error => {
          this.alertService.error(error);
          this.alertService.error('Не удалось удалить logo');
          alert('Не удалось удалить logo');
          this.dataIsLoading = false;
        },
        () => {
          this.dataIsLoading = false;
          alert('Логотип успешно удален');
        }
      );
    }
  }

  public addLogo(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }

  public getSchoolLogo(arena: SchoolViewItem): string {
    return this.service.getSchoolLogo(arena);
  }

  private getSchool(id: number) {
    this.dataIsLoading = true;
    this.service.getSchool(id)
      .subscribe(
        school => {
          this.school = school;
        },
        error => {
          this.errorMessage = error;
          this.dataIsLoading = false;
        },
        () => this.dataIsLoading = false
      );
  }
}
