import { Component, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// import { PermissionService } from 'angular2-permission';
//import { ChangeDetectionStrategy } from '@angular/core';

import { ArenaService } from "./../shared/arena.service";
import { ListResponse } from "app/shared/list/list-response";
import { ArenaListItem } from "app/arenas/shared/arena-list-item";

@Component({
  moduleId: module.id,
  selector: "arena-list",
  inputs: ['content'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "arena-list.component.html"
})

@Injectable()
export class ArenaListComponent implements OnInit {
  content: ArenaListItem[];

  constructor( private service: ArenaService,
               private router: Router) {
  }

  ngOnInit() {
  }

  public viewArena(arena: ArenaListItem): void {
    this.router.navigate([ "arena", arena.id ]);
  }

  public editArena(arena: ArenaListItem): void {
    this.router.navigate([ "arena/edit", arena.id ]);
  }

  public getArenaLogo(arena: ArenaListItem): string {
    return this.service.getArenaLogo(arena);
  }
}
