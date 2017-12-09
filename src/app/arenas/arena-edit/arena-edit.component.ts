import { Component, OnInit } from '@angular/core';
import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ArenaType } from "app/arenas/shared/arena-type";
import { ActivatedRoute, Router } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import  { AlertService } from 'app/components/alert/alert.service';
import { Point } from "app/shared/map/point";
import { debounce } from "rxjs/operator/debounce";

@Component({
  moduleId: module.id,
  selector: "arena-id",
  templateUrl: "arena-edit.component.html"
  // styleUrls: [ "../../../node_modules/bootstrap/dist/css/bootstrap.css" ]
  //styleUrls: ['arena-edit.component.scss']
})
export class ArenaEditComponent implements OnInit {
  arena: ArenaViewItem;
  returnUrl: string;
  loading = false;
  id: number;
  mapPoint: Point;
  // private sub: any;
  arenaTypes: ArenaType[];

  errorMessage: string;

  constructor( private service: ArenaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService ) {
    // Получаем id из url.
    // Url вида ...edit/21, где 21 - это id.
    // В роутинге должно быть прописано так edit/:id
    // this.id = this.activatedRoute.snapshot.params['id'];
    // console.log('id='+this.id+'route='+this.activatedRoute.snapshot.params['id']);
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.loading = true;
    this.getArenaTypes();
    /*this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getArena(this.id);
    });*/
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getArena(this.id);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
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
    this.loading = true;
    this.service.getArena(id)
      .subscribe(
        arena => {
          this.arena = arena;
          this.mapPoint = this.getMapPoint(arena);
          console.log(this.arena);
          this.loading = false;
        },
        error => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
  }

  private getMapPoint(arena: ArenaViewItem): Point {
    if (this.arena && this.arena.latitude && this.arena.longitude) {
      return {latitude: this.arena.latitude, longitude: this.arena.longitude};
    }
  }

  private editArena(arena: ArenaViewItem) {
    console.log(this.arena);
    console.log(this.id);
    console.log("ok");
    this.service.updateArena(this.id, this.arena).subscribe(
      data => {
        //console.log(data);
        //this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось сохранить изменения");
        this.loading = false;
      });
  }

  private getArenaTypes() {
    this.loading = true;
    this.service.getArenaTypes()
      .subscribe(
        arenaTypes => {
          let emptyValue: ArenaType = {id: null, name: "Тип арены не задан"};
          this.arenaTypes = new Array<ArenaType>();
          this.arenaTypes.push(emptyValue);
          this.arenaTypes = this.arenaTypes.concat(arenaTypes);
          this.loading = false;
        },
        error => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
  }
}
