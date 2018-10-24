import { Component, ChangeDetectionStrategy, Input, Injectable } from '@angular/core';
import { Todo } from 'app/shared/combobox/todo';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

@Injectable()
export class ComboboxComponent {
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
