import { Component, OnInit } from "@angular/core";
import { Params } from "@angular/router";
import { AgmMap, AgmMarker } from '@agm/core';
import { ActivatedRoute } from "@angular/router";

import { ArenaService } from "./../shared/arena.service";
import { ArenaViewItem } from "app/arenas/shared/arena-view-item";

@Component({
  moduleId: module.id,
  selector: "arena-view",
  templateUrl: "arena-view.component.html",
  styleUrls: ["arena-view.component.scss"]
})
export class ArenaViewComponent implements OnInit {
  arena: ArenaViewItem;
  id: number;
  errorMessage: string;

  constructor( private service: ArenaService,
               private activatedRoute: ActivatedRoute) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getArena(this.id);
  }

  ngOnInit() {

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

  private getArena(id: number) {
    this.service.getArena(id)
    .then(
      arena => this.arena = arena,
      error => this.errorMessage = error
    );
  }

  public getArenaLogo(arena: ArenaViewItem): string {
    let logoSrc = "http://hockey.smargit.com/HockeyApp.WebApi";
    let placeholder = "http://via.placeholder.com/350x150";
    return arena.logo ? logoSrc + arena.logo : placeholder;
  }
}
