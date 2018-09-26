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
  @Input() games: Array<Game>;
  @Input() teams: Array<Team>;
  dataIsLoading: boolean;
  errorMessage: string;
  round_count: number = 0;
  teamsCount: number = 0;
  rounds: Array<number>;
  levels_counts: Array<number>;
  levels: Array<Array<number>>;
  round_names: Array<string>;

  constructor( private tournamentService: TournamentService,
               private alertService: AlertService ) {

  }

  ngOnInit() {
    this.dataIsLoading = false;
    this.round_names = new Array<string>();
    this.round_names.push('Первый тур');
    this.round_names.push('Финал');
    this.round_names.push('Полуфинал');
    this.round_names.push('1/4');
    this.round_names.push('1/8');
    this.round_names.push('1/16');
    this.round_names.push('1/32');
    this.rounds = new Array<number>();
    //if (this.teams) {
    this.teamsCount = this.teams.length;
    //console.log(this.teamsCount);
    let isExponentTwo = (num) => (num & (num - 1) && num !== 0) ? false : true;
    if (isExponentTwo(this.teamsCount)) {
      this.levels = new Array<Array<number>>();
      this.levels_counts = new Array<number>();
      this.round_count = Math.log2(this.teamsCount);
      //console.log(this.round_count);
      //this.rounds.push(this.round_names[0]);
      for (let i = 0; i < this.round_count; i++) {
        this.rounds.push(i);
      }
      for (let k = this.teamsCount; k >= 2; k = k/2) {
        this.levels_counts.push(k);
        console.log(k);
      }
      for (let m = 0; m < this.levels_counts.length; m++) {
        let arr: Array<number> = new Array<number>();
        for (let p = 0; p < this.levels_counts[m]; p++) {
          arr.push(p);
        }
        this.levels.push(arr);
      }
    }
    //}
  }
}
