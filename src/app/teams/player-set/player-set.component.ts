import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { TeamService } from 'app/teams/shared/team.service';
import { Player } from 'app/teams/shared/player';
import { Team } from 'app/teams/shared/team';
import { AlertService } from 'app/components/alert/alert.service';

import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Item } from 'app/tournament-announcements/shared/item';

@Component({
  moduleId: module.id,
  selector: 'player-set',
  templateUrl: 'player-set.component.html'
})

@Injectable()
export class PlayerSetComponent implements OnInit {
  @Input() isDisabled: boolean;
  @Input() team: Team;
  @Output() onChanged = new EventEmitter<Team>();

  playerSetType: Item;
  playerSetTypes: Array<Item>;

  returnUrl: string;
  dataIsLoading: boolean;
  id: number;
  errorMessage: string;

  closeResult: string;
  private modalRef: NgbModalRef;

  constructor( private service: TeamService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService,
               private modalService: NgbModal ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.dataIsLoading = true;
    this.getPlayerSetTypes();
    this.playerSetType = null;
    this.dataIsLoading = false;
  }

  ngOnInit() {
  }

  public getPlayersIconClass() {
    return this.service.getPlayersIconClass();
  }

  public getAddIconClass() {
    return this.service.getAddIconClass();
  }

  public getMoveIconClass() {
    return this.service.getMoveIconClass();
  }
  public getDeleteIconClass() {
    return this.service.getDeleteIconClass();
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  close() {
    this.modalRef.close();
  }

  save() {
    console.log('save');
    this.onChanged.emit(this.team);
    this.modalRef.close();
  }

  private getPlayerSetTypes() {
    this.playerSetTypes = new Array<Item>();
    this.playerSetTypes.push(new Item({value: 'current', name: 'Текущий сезон'}));
    this.playerSetTypes.push(new Item({value: 'prev', name: 'Предыдущий сезон'}));
    this.playerSetTypes.push(new Item({value: '5 years', name: 'Предыдущие 5 лет'}));
  }
}
