import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    imports: [MatButtonModule, MatCheckboxModule, MatIconModule]
})
export class TodoComponent {
  todo = input.required<Todo>();
  toggle = output<number>();
  delete = output<number>();

  onToggle() {
    this.toggle.emit(this.todo().id);
  }

  onDelete() {
    this.delete.emit(this.todo().id);
  }
}