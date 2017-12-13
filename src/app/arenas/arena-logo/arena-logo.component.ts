import { Component, OnInit } from '@angular/core';
import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import  { AlertService } from 'app/components/alert/alert.service';
import { debounce } from "rxjs/operator/debounce";

@Component({
  moduleId: module.id,
  selector: 'arena-id',
  templateUrl: 'arena-logo.component.html',
  // styleUrls: [ "../../../node_modules/bootstrap/dist/css/bootstrap.css" ]
  styleUrls: ['arena-logo.component.scss']
})

export class ArenaLogoComponent implements OnInit {
  arena: ArenaViewItem;
  returnUrl: string;
  loading = false;
  id: number;
  deleteFlag: boolean;
  files: any;
  errorMessage: string;

  constructor( private service: ArenaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.loading = true;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getArena(this.id);
    this.deleteFlag = false;
  }

  ngOnInit() {

  }
  private getArena(id: number) {
    this.loading = true;
    this.service.getArena(id)
      .subscribe(
        arena => {
          this.arena = arena;
          console.log(this.arena);
          this.loading = false;
        },
        error => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
  }

   private updateLogo() {
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
      this.service.addLogo(this.id, formData).subscribe(
        data => {
          //this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
    }
  }

  private deleteLogo() {
    console.log('delete');
    this.service.deleteLogo(this.id).subscribe(
      data => {
        // this.router.navigate([this.returnUrl]);
        this.getArena(this.id);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось удалить logo");
        this.loading = false;
      });
  }

  private setDeleteFlag() {
    console.log(this.deleteFlag);
  }

  private addLogo(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
    //console.log(this.files);
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
}
