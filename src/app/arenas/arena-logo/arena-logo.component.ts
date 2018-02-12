import { Component, OnInit } from '@angular/core';
import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaViewItem } from 'app/arenas/shared/arena-view-item';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AlertService } from 'app/components/alert/alert.service';
import { debounce } from "rxjs/operator/debounce";

@Component({
  moduleId: module.id,
  selector: 'arena-id',
  templateUrl: 'arena-logo.component.html',
  styleUrls: ['arena-logo.component.scss']
})

export class ArenaLogoComponent implements OnInit {
  arena: ArenaViewItem;
  returnUrl: string;
  id: number;
  deleteFlag: boolean;
  files: any;
  errorMessage: string;
  dataIsLoading: boolean;

  constructor( private service: ArenaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getArena(this.id);
    this.deleteFlag = false;
  }

  ngOnInit() {

  }

  public updateLogo() {
    if (this.files) {
      const formData = new FormData();
      formData.append('image', this.files[0]);
      this.dataIsLoading = true;
      this.service.addLogo(this.id, formData).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error)
        },
        () => this.dataIsLoading = false
      );
    }
  }

  public deleteLogo() {
    console.log('delete');
    this.dataIsLoading = true;
    this.service.deleteLogo(this.id).subscribe(
      data => {
        this.getArena(this.id);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось удалить logo");
      },
      () => this.dataIsLoading = false
    );
  }

  private getArena(id: number) {
    this.dataIsLoading = true;
    this.service.getArena(id)
      .subscribe(
        arena => {
          this.arena = arena;
          console.log(this.arena);
        },
        error => {
          this.errorMessage = error;
        },
        () => this.dataIsLoading = false
      );
  }

  public setDeleteFlag() {
    console.log(this.deleteFlag);
  }

  public addLogo(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }

  public getArenaLogo(arena: ArenaViewItem): string {
    return this.service.getArenaLogo(arena);
  }
}
