import { Component, Input, OnInit, signal, WritableSignal, EventEmitter, Output } from '@angular/core';
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
import {catchError, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  standalone: true,
  imports: [
    TodoComponent,
    FormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatListModule,
    MatCardModule,
    DatePipe,
    AsyncPipe
  ]
})
export class TodoListComponent implements OnInit {
  @Input() inputDate!: Date;  
  newTodoTitle: string = '';
  newTodoDate: Date = new Date();
  //todoList = signal({ date: new Date(), todos: [] });
  todoList$: Observable<Todo[]> = new Observable<Todo[]>();
  errorMessage = signal('');

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.errorMessage.set('');
      this.todoList$ = this.todoService.getTodos().pipe(
        startWith([]),
        catchError((err: any) => {
          this.errorMessage.set(err.message || err.toString());
          return of([]); // reset message to placeholder
        })
      );
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      //this.todoService.addTodoForDate(this.inputDate, this.newTodoTitle);
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