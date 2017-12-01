import { Component, Injectable, OnInit } from "@angular/core";

import { ArenaService } from "app/arenas/shared/arena.service";
import { ArenaFilter } from "app/arenas/shared/arena-filter";
import { ArenaType } from "app/arenas/shared/arena-type";
import { City } from "app/core/geo/city";

@Component({
  moduleId: module.id,
  selector: "arena-filter",
  inputs: ['filter'],
  templateUrl: "arena-filter.component.html",
  styleUrls: ["arena-filter.component.scss"]
})

@Injectable()
export class ArenaFilterComponent implements OnInit {
  filter: ArenaFilter;
  arenaTypes: ArenaType[];
  cities: City[];
  errorMessage: string;

  constructor( private service: ArenaService) {
  }

  ngOnInit() {
    this.getArenaTypes();
    this.getCities();
  }

  public search(){
    // todo
  }

  private getArenaTypes() {
    this.service.getArenaTypes()
    .then(
      arenaTypes => this.arenaTypes = arenaTypes,
      error => this.errorMessage = error
    );
  }

  private getCities() {
      // todo
  }
}
