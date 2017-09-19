import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ArenasService } from "./arenas.service";
import { Arena } from "./arenas";

@Component({
  moduleId: module.id,
  selector: "arenas-list",
  templateUrl: "arenas.component.html",
  //styleUrls: [ "../../../node_modules/bootstrap/dist/css/bootstrap.css" ]
  styleUrls: ["arenas.component.scss"]
})
export class ArenasComponent implements OnInit {
  arenas: Arena[];
  errorMessage: string;

  constructor( private service: ArenasService,
               private router: Router ) {
  }

  ngOnInit() {
    this.getArenas();
  }

  public refresh() {
    this.getArenas();
  }

  public editArena( arena: Arena ) {
    this.router.navigate([ "arenas", "edit", arena.id ]);
  }

  public deleteArena( arena: Arena ) {
    this.router.navigate([ "arenas", "delete", arena.id ]);
  }

  public createArena() {
    this.router.navigate([ "arenas", "create" ]);
  }

  private getArenas() {
    this.service.getArenas().then(
      arenas => this.arenas = arenas,
      error => this.errorMessage = error
    );
  }
}
