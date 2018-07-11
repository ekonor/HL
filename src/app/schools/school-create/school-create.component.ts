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

import { SchoolService } from 'app/schools/shared/school.service';
import { SchoolViewItem } from 'app/schools/shared/school-view-item';
import { SchoolType } from 'app/schools/shared/school-type';
import { City } from 'app/core/geo/city';
import { AlertService } from 'app/components/alert/alert.service';
import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { Arena } from 'app/arenas/shared/arena';

@Component({
  moduleId: module.id,
  selector: 'school-create',
  templateUrl: 'school-create.component.html'
})
export class SchoolCreateComponent implements OnInit {
  school: SchoolViewItem;
  returnUrl: string;
  dataIsLoading: boolean;
  id: number;
  // mapPoint: Point;
  // private sub: any;
  errorMessage: string;
  city: City;
  arena: ArenaListItem;

  constructor( private service: SchoolService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.dataIsLoading = true;
    this.school = new SchoolViewItem;
    // this.city = new City;
    this.dataIsLoading = false;
  }

  ngOnInit() {
  }

  public addSchool(school: SchoolViewItem) {
    if (!this.city && !this.city.id) {
      this.alertService.error('Не удалось сохранить изменения');
      return;
    }
    this.school.city = this.city;
    this.dataIsLoading = true;
    this.service.addSchool(this.school).subscribe(
      data => {
        this.router.navigate(['/schools']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error('Не удалось добавить школу');
        this.dataIsLoading = false;
      });
  }

  public setCity(city: City) {
    if (city && city.id) {
      this.school.city = city;
      this.city = city;
    }
  }

  public setArena(arena: ArenaListItem) {
    if (arena && arena.id) {
      this.arena = arena;
      this.school.arena = new Arena({ id: this.arena.id, name: this.arena.name, linkName: this.arena.linkName, logo: this.arena.logo });;
    }
  }
}
