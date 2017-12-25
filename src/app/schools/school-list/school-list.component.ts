import { Component, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { SchoolService } from "./../shared/school.service";
import { ListResponse } from "app/shared/list/list-response";
import { SchoolListItem } from "app/schools/shared/school";

@Component({
  moduleId: module.id,
  selector: "school-list",
  inputs: ['content'],
  templateUrl: "school-list.component.html"
})

@Injectable()
export class SchoolListComponent implements OnInit {
  content: SchoolListItem[];

  constructor( private schoolService: SchoolService,
               private router: Router) {
  }

  ngOnInit() {
  }

  public viewSchool(school: SchoolListItem): void {
    this.router.navigate([ "school", school.id ]);
  }

  public editSchool(school: SchoolListItem): void {
    this.router.navigate([ "school/edit", school.id ]);
  }

  public addSchool(): void {
    this.router.navigate([ "school/create"]);
  }

  public getSchoolLogo(school: SchoolListItem): string {
    return this.schoolService.getSchoolLogo(school);
  }
}
