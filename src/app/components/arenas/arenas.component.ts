import { Component, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ArenasService } from "./arenas.service";
import { Arena } from "./arenas";
import { ArenaType } from "./arenas-types";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/min';
//import { ChangeDetectionStrategy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  moduleId: module.id,
  selector: "arenas-list",
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "arenas.component.html",
  //styleUrls: [ "../../../node_modules/bootstrap/dist/css/bootstrap.css" ]
  styleUrls: ["arenas.component.scss"]
})

@Injectable()
export class ArenasComponent implements OnInit {
  arenas: Arena[];
  arenasTypes: ArenaType[];
  errorMessage: string;
  cookieValue = 'UNKNOWN';

  //arenasType: ArenaType;

  /**
   * @type {number} numberOfArenas The number of arenas, used for max attribute for limit and page.
   */
  numberOfArenas: number;
  /**
   * @type {number} limit The number of arenas per page.
   */
  limit: number;

  /**
   * @type {number} page The current page.
   */
  page: number = 1;

  /**
   * @type {Arena} filter The object containing the filter values to apply to arenasfilter.
   * Could have created another entity called BookFilter, but it would basically have the same fields.
   */
  filter: Arena = new Arena();

  pages: number;

  constructor( private service: ArenasService,
               private router: Router,
               private cookieService: CookieService ) {
  }

  ngOnInit() {
    this.getArenas();
    this.getArenasTypes();
    this.cookieService.set( 'Test', 'Hello World' );
    this.cookieValue = this.cookieService.get('Test');
    console.log(this.cookieValue);
  }

  public refresh() {
    this.getArenas();
    this.getArenasTypes();
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
      arenas => {this.arenas = arenas;
      this.numberOfArenas = this.arenas.length;
      this.pages = Math.ceil(this.numberOfArenas/10);
      console.log(this.arenas.length);
      this.limit = this.arenas.length; // Start off by showing all arenas on a single page.
      error => this.errorMessage = error}
    );
  }

  private getArenasTypes() {
    this.service.getArenasTypes().then(
      arenasTypes => this.arenasTypes = arenasTypes,
      error => this.errorMessage = error
    );
    //console.log(this.arenasTypes);
  }
}
