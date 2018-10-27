import { Component, ChangeDetectionStrategy, Input, Injectable, OnInit } from '@angular/core';
import { Todo } from 'app/shared/combobox/todo';
import {Referee} from 'app/referees/shared/referee';

@Component({
  selector: 'referee-multiselect',
  templateUrl: './referee-multiselect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

@Injectable()
export class RefereeMultiselectComponent implements OnInit{
  @Input() todos: Todo[];
  @Input() referees: Array<Referee>;
  checks: boolean[];

  public checkboxesShown = false;

  constructor() {

  }

  ngOnInit() {
    this.checks = [];
    for (let i = 0; i < this.referees.length; i++) {
      this.checks.push(true);
    }
  }

  public showCheckboxes(): void {
    this.checkboxesShown = !this.checkboxesShown;
  }

  /*public checkTodo(todo: Todo): void {
    console.log('ev');
    if (this.todos) {
      if (-1 !== this.todos.indexOf(todo)) {
        todo.completed = !todo.completed;
      }
    }
  }*/

  public checkReferee(index: number, check: boolean): void {
    console.log('ev');
    console.log(this.checks[index]);
    if ((this.referees.length < index) && (index >= 0)) {
      this.checks[index] = !this.checks[index];
    }
  }
}
