import { Component, input, OnInit, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, AsyncPipe } from '@angular/common';

import { Observable, of } from 'rxjs';

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

  newTodoTitle: string = '';
  newTodoDate: Date = new Date();
  errorMessage = signal('');

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    // Remove loadTodos call
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      this.newTodoTitle = '';
    }
  }

  toggleTodoCompletion(date: Date, id: number) {
    //this.todoService.toggleTodoCompletion(date, id);
  }

  deleteTodo(date: Date, id: number) {
    //this.todoService.deleteTodoFromList(date, id);
  }
}