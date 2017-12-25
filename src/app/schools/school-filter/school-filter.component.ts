import { Component, Injectable, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { SchoolService } from "app/schools/shared/school.service";
import { SchoolFilter } from "app/schools/shared/school-filter";
import { City } from "app/core/geo/city";

@Component({
  moduleId: module.id,
  selector: "school-filter",
  templateUrl: "school-filter.component.html"
})

@Injectable()
export class SchoolFilterComponent implements OnInit {

  @Input() filter: SchoolFilter;
  @Output() onFiltered = new EventEmitter<boolean>();

  cities: City[];
  errorMessage: string;
  toggled: boolean;

  constructor( private service: SchoolService) {
  }

  ngOnInit() {
    this.getCities();
  }

  search() {
    this.onFiltered.emit();
  }

  private getCities() {
      // todo
  }
}
