import { Component, OnInit } from "@angular/core";
//import { Router } from "@angular/router";
import { ArenasService } from "./arenas.service";
import { Arena } from "./arenas";
import {ActivatedRoute} from "@angular/router";
import { AgmMap, AgmMarker } from '@agm/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

var google: any;
@Component({
  moduleId: module.id,
  selector: "arenas-id",
  templateUrl: "arenas-id.component.html",
  //styleUrls: [ "../../../node_modules/bootstrap/dist/css/bootstrap.css" ]
  styleUrls: ["arenas-id.component.scss"]
})
export class ArenasIdComponent implements OnInit {
  arena: Arena;
  id: string;
  errorMessage: string;

  constructor( private service: ArenasService,
              /* private router: Router, */ private activatedRoute: ActivatedRoute) {
    //Получаем id из url.
    //Url вида ...item/21, где 21 - это id.
    //В роутинге должно быть прописано так item/:id
    this.id = this.activatedRoute.snapshot.params['id'];
    //console.log('id='+this.id+'route='+this.activatedRoute.snapshot.params['id']);
    this.getArena(this.id);
    //console.log(this.arena);
  }

  ngOnInit() {

  }

  public refresh(id) {
    //this.getArena(id);
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

  private getArena(id: string) {
    this.service.getArena(id).then(
      arena => this.arena = arena,
      error => this.errorMessage = error
    );
  }
}
