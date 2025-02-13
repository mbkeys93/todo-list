import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './components/todolist/todolist.component';
import { TodoService } from './services/todo.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AddTodoGlobalComponent } from "./components/add-todo-global/add-todo-global.component";
import { AsyncPipe } from '@angular/common';
import { Todo } from './models/todo.model';

import { Observable, of } from 'rxjs';
import { catchError, startWith, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodoListComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    AddTodoGlobalComponent,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'Todo List Application';
  todos$: Observable<Todo[]> = new Observable<Todo[]>();
  todoListDates$: Observable<Date[]> = new Observable<Date[]>();
  errorMessage = signal('');

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos$ = this.todoService.getTodos().pipe(
      startWith([]),
      catchError(err => {
        this.errorMessage.set(err.message || 'Error loading todos');
        return of([]);
      })
    );

    this.todoListDates$ = this.todos$.pipe(
      map(todos => [...new Set(
        todos.map(todo => todo.date.toISOString().split('T')[0])
      )].map(dateStr => new Date(dateStr)))
    );
  }
  
  handleDatesFromTodoList(data: Date): void {
    this.todos$.pipe(take(1)).subscribe(todos => {
      this.todos$ = of([...todos, { 
        id: 0, // temporary ID, should be handled by backend
        date: data,
        description: '',
        completed: false
      }]);
    });
  }

  filterTodosByDate(date: Date, todos: Todo[]): Todo[] {
    return todos.filter(todo => 
      todo.date.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );
  }
}