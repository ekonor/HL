import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params } from '@angular/router';
import { AgmMap, AgmMarker } from '@agm/core';
import { ActivatedRoute } from '@angular/router';

import { SchoolService } from 'app/schools/shared/school.service';
import { SchoolViewItem } from 'app/schools/shared/school-view-item';
import { Point } from 'app/shared/map/point';
import { debounce } from 'rxjs/operator/debounce';

@Component({
  moduleId: module.id,
  selector: 'school-view',
  templateUrl: 'school-view.component.html'
})
export class SchoolViewComponent {
  school: SchoolViewItem;
  id: number;
  dataIsLoading: boolean;
  errorMessage: string;
  private sub: any;

  constructor( private service: SchoolService,
               private activatedRoute: ActivatedRoute) {
    //this.school = new SchoolViewItem;

  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.dataIsLoading = true;
      this.id = parseInt(params['id']);
      this.getSchool(this.id);
      this.dataIsLoading = false;
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  public getSchoolLogo(school: SchoolViewItem): string {
    return this.service.getSchoolLogo(school);
  }

  getDefaultIfNull(value: any) {

  }

  private getSchool(id: number) {
    this.service.getSchool(id)
    .subscribe(
      school => {
        this.school = school;
      },
      error => this.errorMessage = error
    );
  }
}
