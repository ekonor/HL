import { Component, OnInit } from "@angular/core";
import { Params } from "@angular/router";
import { AgmMap, AgmMarker } from '@agm/core';
import { ActivatedRoute } from "@angular/router";

import { ArenaService } from "./../shared/arena.service";
import { ArenaViewItem } from "app/arenas/shared/arena-view-item";
import { Point } from "app/shared/map/point";
import { debounce } from "rxjs/operator/debounce";

@Component({
  moduleId: module.id,
  selector: "arena-view",
  templateUrl: "arena-view.component.html",
  styleUrls: ["arena-view.component.scss"]
})
export class ArenaViewComponent{
  arena: ArenaViewItem;
  id: number;
  mapPoint: Point;
  
  errorMessage: string;

  constructor( private service: ArenaService,
               private activatedRoute: ActivatedRoute) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getArena(this.id);
  }

  /*public editArena( arena: Arena ) {
    this.router.navigate([ "arenas", "edit", arena.id ]);
  }

  public deleteArena( arena: Arena ) {
    this.router.navigate([ "arenas", "delete", arena.id ]);
  }

  public createArena() {
    this.router.navigate([ "arenas", "create" ]);
  }*/

  public getArenaLogo(arena: ArenaViewItem): string {
    return this.service.getArenaLogo(arena);
  }

  private getArena(id: number) {
    this.service.getArena(id)
    .subscribe(
      arena => {
        this.arena = arena;
        this.mapPoint = this.getMapPoint(arena);
      },
      error => this.errorMessage = error
    );
  }

  private getMapPoint(arena: ArenaViewItem) : Point {
    if(this.arena && this.arena.latitude && this.arena.longitude){
      return { latitude: this.arena.latitude, longitude: this.arena.longitude };
    }
  }
}
