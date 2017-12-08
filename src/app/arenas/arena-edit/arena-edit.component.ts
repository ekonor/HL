import { Component, OnInit } from '@angular/core';
import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ActivatedRoute } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Point } from "app/shared/map/point";
import { debounce } from "rxjs/operator/debounce";

@Component({
  moduleId: module.id,
  selector: "arena-id",
  templateUrl: "arena-edit.component.html",
  // styleUrls: [ "../../../node_modules/bootstrap/dist/css/bootstrap.css" ]
  // styleUrls: ["arenas-id.component.scss"]
})
export class ArenaEditComponent implements OnInit {
  arena: ArenaViewItem;
  id: number;
  mapPoint: Point;
  private sub : any;

  errorMessage: string;

  constructor( private service: ArenaService,
              /* private router: Router, */ private activatedRoute: ActivatedRoute) {
    // Получаем id из url.
    // Url вида ...edit/21, где 21 - это id.
    // В роутинге должно быть прописано так edit/:id
    // this.id = this.activatedRoute.snapshot.params['id'];
    // console.log('id='+this.id+'route='+this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getArena(this.id);
    });
    this.getArena(this.id);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  /*public refresh(id) {
    //this.getArena(id);
  }*/

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

  private editArena(arena: ArenaViewItem) {
    console.log("ok");
    this.service.updateArena(arena);
  }
}
