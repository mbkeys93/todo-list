import { Component, input, output, signal, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css'],
    imports: [
        TodoComponent,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatListModule,
        MatCardModule,
        DatePipe
    ]
})
export class TodoListComponent implements OnInit {
  todos = input<Todo[]>();
  todoToggled = output<number>();
  todoDeleted = output<number>();

  newTodoTitle = signal('');
  newTodoDate: Date = new Date();
  errorMessage = signal('');

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    // Remove loadTodos call
  }

  addTodo() {
    if (this.newTodoTitle().trim()) {
      this.newTodoTitle.set('');
    }
  }

  toggleTodoCompletion(date: Date, id: number) {
    this.todoToggled.emit(id);
  }

  deleteTodo(date: Date, id: number) {
    this.todoDeleted.emit(id);
  }
}