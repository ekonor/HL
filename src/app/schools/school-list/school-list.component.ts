import { Component, Injectable, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { SchoolService } from 'app/schools/shared/school.service';
import { ListResponse } from 'app/shared/list/list-response';
import { SchoolListItem } from 'app/schools/shared/school-list-item';

@Component({
  moduleId: module.id,
  selector: 'school-list',
  //inputs: ['content'],
  templateUrl: 'school-list.component.html'
})

@Injectable()
export class SchoolListComponent implements OnInit {

  @Input() content: SchoolListItem[];

  constructor( private service: SchoolService,
               private router: Router) {
  }

  ngOnInit() {
  }

  public viewSchool(school: SchoolListItem): void {
    this.router.navigate([ 'school', school.id ]);
  }

  public editSchool(school: SchoolListItem): void {
    this.router.navigate([ 'school/edit', school.id ]);
  }

  public getSchoolLogo(school: SchoolListItem): string {
    return this.service.getSchoolLogo(school);
  }

  public getEditIconClass(): string {
    return this.service.getEditIconClass();
  }
}
