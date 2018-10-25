import { Component, ChangeDetectionStrategy, Input, Injectable } from '@angular/core';
import { Todo } from 'app/shared/combobox/todo';

@Component({
  selector: 'referee-multiselect',
  templateUrl: './referee-multiselect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

@Injectable()
export class RefereeMultiselectComponent {
  @Input() todos: Todo[];

  public checkboxesShown = false;

  constructor() {}

  public showCheckboxes(): void {
    this.checkboxesShown = !this.checkboxesShown;
  }

  public checkTodo(todo: Todo): void {
    console.log('ev');
    if (this.todos) {
      if (-1 !== this.todos.indexOf(todo)) {
        todo.completed = !todo.completed;
      }
    }

  }
}
