import { Component, OnInit } from '@angular/core';
import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ArenaType } from "app/arenas/shared/arena-type";
import { City } from "app/core/geo/city";
import { ActivatedRoute, Router } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import  { AlertService } from 'app/components/alert/alert.service';
import { Point } from "app/shared/map/point";
import { debounce } from "rxjs/operator/debounce";

@Component({
  moduleId: module.id,
  selector: 'arena-id',
  templateUrl: 'arena-edit.component.html',
  // styleUrls: [ "../../../node_modules/bootstrap/dist/css/bootstrap.css" ]
  styleUrls: ['arena-edit.component.scss']
})


export class ArenaEditComponent implements OnInit {
  arena: ArenaViewItem;
  returnUrl: string;
  loading = false;
  id: number;
  //cityId: number;
  deleteFlag: boolean;
  mapPoint: Point;
  // private sub: any;
  arenaTypes: ArenaType[];
  cities: City[];
  files: any;
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
    this.arena = new ArenaViewItem;
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.loading = true;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getArena(this.id);
    this.getArenaTypes();
    this.getCities();
    this.deleteFlag = false;
    /*this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getArena(this.id);
    });*/

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  /*public refresh(id) {
    //this.getArena(id);
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
    if (this.arena && this.arena.coordinates && this.arena.coordinates.latitude && this.arena.coordinates.longitude) {
      return {latitude: this.arena.coordinates.latitude, longitude: this.arena.coordinates.longitude};
    }
  }

  public editArena(arena: ArenaViewItem) {
    console.log(this.arena);
    console.log(this.id);
    //console.log(this.arenaTypeId);
    console.log('ok');
    //this.setArenaTypeId();
    //this.setCityId();
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
    this.updateLogo();
  }

  public updateLogo()
  {
    if (this.files) {
      /*const files: FileList = this.files;
       const formData = new FormData();
       for (let i = 0; i < files.length; i++){
         formData.append('photo', files[i]);
       }
       this.service.deleteLogo(this.id);
       this.service.addLogo(this.id, formData);*/
      const formData = new FormData();
      formData.append('image', this.files[0]);
      if (this.arena.logo != null) {
      this.service.deleteLogo(this.id).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
      }
      this.service.addLogo(this.id, formData).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
    }
  }


  // upload() {
  //   const fileBrowser = this.fileInput.nativeElement;
  //   if (fileBrowser.files && fileBrowser.files[0]) {
  //     const formData = new FormData();
  //     formData.append("image", fileBrowser.files[0]);
  //     this.projectService.upload(formData, this.project.id).subscribe(res => {
  //       // do stuff w/my uploaded file
  //     });
  //   }
  // }

  public deleteArena() {
    console.log(this.arena);
    console.log(this.id);
    console.log('delete');
    //this.setArenaTypeId();
    //this.setCityId();
    this.service.deleteArena(this.id).subscribe(
      data => {
        //console.log(data);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось удалить арену");
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
  /* Перевод выбранного текста Тип арены в айди*/
  //private setArenaTypeId() {
    /*let find = false;
    let i = this.arenaTypes.length;
    while (i--) {
      if (this.arenaTypes[i].name === this.arena.arenaTypeName) {
        this.arenaTypeId = this.arenaTypes[i].id;
        find = true;
      }
    }
    if (!find) {
      console.log('error');
      this.arenaTypeId = null;
    }*/
    //this.arenaTypeId = this.arena.;
  //}

  /* Перевод выбранного текста Город в айди*/
  /*private setCityId() {
    let find = false;
    let i = this.cities.length;
    while (i--) {
      if (this.cities[i].name === this.arena.cityName) {
        this.cityId = this.cities[i].id;
        find = true;
      }
    }
    if (!find) {
      console.log('error');
      this.cityId = null;
    }
  }*/

  private getCities() {
    this.loading = true;
    this.service.getCities()
      .subscribe(
        cities => {
          let emptyValue: City = {id: null, name: "Город не указан", countryId: null};
          this.cities = new Array<City>();
          this.cities.push(emptyValue);
          this.cities = this.cities.concat(cities);
          console.log(cities);
          this.loading = false;
        },
        error => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
  }

  public setDeleteFlag() {
    console.log(this.deleteFlag);
  }

  public addLogo(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
    console.log(this.files);
    /*if (this.files) {
      let files :FileList = this.files;
      const formData = new FormData();
      for(let i = 0; i < files.length; i++){
        formData.append('photo', files[i]);
      }
    }*/
  }

  public getArenaLogo(arena: ArenaViewItem): string {
    return this.service.getArenaLogo(arena);
  }

  public editLogo(){
    this.router.navigate([ "arena", "logo", this.arena.id ]);
  }
}
