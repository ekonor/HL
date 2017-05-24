import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-children-teams',
  templateUrl: './children-teams.component.html',
  styleUrls: ['./children-teams.component.scss']
})
export class ChildrenTeamsComponent implements OnInit {

  title = 'Детские команды';

  constructor() { }

  ngOnInit() {
  }

}
