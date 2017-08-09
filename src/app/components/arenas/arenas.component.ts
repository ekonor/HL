import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ArenasService} from "./arenas.service";




@Component({
  selector: 'app-arenas',
  templateUrl: './arenas.component.html',
  styleUrls: ['./arenas.component.scss']
})
export class ArenasComponent implements OnInit {

   latestArenasList$: Observable<any>;


  constructor(private arenasService: ArenasService) {

    this.latestArenasList$ = this.arenasService.getArenasList();
  }

  ngOnInit() {
  }

}

