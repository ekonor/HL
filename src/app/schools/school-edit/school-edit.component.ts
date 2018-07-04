import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'app/schools/shared/school.service';
import { SchoolViewItem } from 'app/schools/shared/school-view-item';
import { City } from 'app/core/geo/city';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'app/components/alert/alert.service';
import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { Arena } from 'app/arenas/shared/arena';

@Component({
  moduleId: module.id,
  selector: 'school-edit',
  templateUrl: 'school-edit.component.html'
})

export class SchoolEditComponent implements OnInit {
  school: SchoolViewItem;
  returnUrl: string;
  id: number;
  deleteFlag: boolean;
  files: any;
  errorMessage: string;
  city: City;
  arena: ArenaListItem;
  dataIsLoading: boolean;

  constructor( private service: SchoolService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.dataIsLoading = true;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getSchool(this.id);
    this.dataIsLoading = false;
    this.deleteFlag = false;
  }

  ngOnInit() {

  }


  public editSchool(arena: SchoolViewItem) {
    if (!this.city && !this.city.id) {
      this.alertService.error('Не удалось сохранить изменения');
      return;
    }
    this.school.city = this.city;
    console.log(this.school);
    console.log(this.id);
    console.log('ok');
    this.dataIsLoading = true;
    this.service.updateSchool(this.id, this.school).subscribe(
      data => {
        this.router.navigate(['/schools']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error('Не удалось сохранить изменения');
        this.dataIsLoading = false;
      });
    this.updateLogo();
  }

  public updateLogo() {
    if (this.files) {
      this.dataIsLoading = true;
      const formData = new FormData();
      formData.append('image', this.files[0]);
      if (this.school.logo != null) {
      this.service.deleteLogo(this.id).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.dataIsLoading = false;
        },
        () => { this.dataIsLoading = false; } );
      }
      this.dataIsLoading = true;
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

  public deleteSchool() {
    console.log(this.school);
    console.log(this.id);
    console.log('delete');
    this.dataIsLoading = true;
    this.service.deleteSchool(this.id).subscribe(
      data => {
        this.router.navigate(['/schools']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error('Не удалось удалить школу');
        this.dataIsLoading = false;
      },
      () => { this.dataIsLoading = false; });
  }

  public setDeleteFlag() {
    console.log(this.deleteFlag);
  }

  public addLogo(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
    console.log(this.files);
  }

  public getSchoolLogo(school: SchoolViewItem): string {
    return this.service.getSchoolLogo(school);
  }

  public editLogo() {
    this.router.navigate([ 'school', 'logo', this.school.id ]);
  }

  private getSchool(id: number) {
    this.dataIsLoading = true;
    this.service.getSchool(id)
      .subscribe(
        school => {
          this.school = school;
          this.city = school.city;
          this.arena = school.arena;
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
      this.school.city = city;
      this.city = city;
    }
  }

  private setArena(arena: ArenaListItem) {
    if (arena && arena.id) {
      this.arena = arena;
      this.school.arena = arena;
    }
  }
}
