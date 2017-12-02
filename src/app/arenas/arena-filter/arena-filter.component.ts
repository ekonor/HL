import { Component, Injectable, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { ArenaService } from "app/arenas/shared/arena.service";
import { ArenaFilter } from "app/arenas/shared/arena-filter";
import { ArenaType } from "app/arenas/shared/arena-type";
import { City } from "app/core/geo/city";

@Component({
  moduleId: module.id,
  selector: "arena-filter",
  templateUrl: "arena-filter.component.html"
})

@Injectable()
export class ArenaFilterComponent implements OnInit {

  @Input() filter: ArenaFilter;
  @Output() onFiltered = new EventEmitter<boolean>();
  
  arenaTypes: ArenaType[];
  cities: City[];
  errorMessage: string;

  constructor( private service: ArenaService) {
  }

  ngOnInit() {
    this.getArenaTypes();
    this.getCities();
  }

  search() {
    this.onFiltered.emit();
  }

  private getArenaTypes() {
    this.service.getArenaTypes()
    .subscribe(
      arenaTypes => {
        let emptyValue : ArenaType = { id: null, name: "Выберите тип арены" };
        this.arenaTypes = new Array<ArenaType>();
        this.arenaTypes.push(emptyValue);
        this.arenaTypes =  this.arenaTypes.concat(arenaTypes);
      },
      error => this.errorMessage = error
    );
  }

  private getCities() {
      // todo
  }
}
