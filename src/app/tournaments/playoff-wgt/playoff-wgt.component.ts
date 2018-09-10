import { Component, Injectable, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { NgForm} from '@angular/forms';

import { AlertService } from 'app/components/alert/alert.service';
import { TournamentService } from 'app/tournaments/shared/tournament.service';
import { TeamService } from 'app/teams/shared/team.service';

import { Tournament } from 'app/tournaments/shared/tournament';
import { Team } from 'app/teams/shared/team';
import { Game } from 'app/tournaments/shared/game';

@Component({
  moduleId: module.id,
  selector: 'playoff-wgt',
  templateUrl: 'playoff-wgt.component.html'
})
export class PlayOffWgtComponent implements OnInit {
  dataIsLoading: boolean;
  errorMessage: string;

  @Input() games: Array<Game>;
  @Input() teams: Array<Team>;
  round_count: number = 0;
  teamsCount: number;

  constructor( private tournamentService: TournamentService,
               private alertService: AlertService ) {
    this.dataIsLoading = false;
    if (this.teams != undefined) {
      this.teamsCount = this.teams.length;
      let isExponentTwo = (num) => (num & (num - 1) && num !== 0) ? false : true;
      if (isExponentTwo(this.teamsCount)) {
        this.round_count = Math.log2(this.teamsCount);
        console.log(this.round_count);
      }
    }
  }

  ngOnInit() {

  }

}
