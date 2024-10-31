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

import { Observable, of } from 'rxjs';
import {catchError, startWith} from 'rxjs/operators';

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
  todoListDates$: Observable<Date[]> = new Observable<Date[]>();
  errorMessage = signal('');

  constructor(public todoService: TodoService) {
    // convert to a set and back to an array to remove duplicates
    this.todoListDates$ = this.todoService.getTodoListDates();
  }

  ngOnInit(): void {
    this.loadDates();
  }

  loadDates(): void {
    this.errorMessage.set('');
      this.todoListDates$ = this.todoService.getTodoListDates().pipe(
        startWith([]),
        catchError((err: any) => {
          this.errorMessage.set(err.message || err.toString());
          return of([]); // reset message to placeholder
        })
      );
  }
  
  handleDatesFromTodoList(data: Date): void {
    this.todoListDates$.subscribe(dates => { // unsubscribe?
      this.todoListDates$ = of([...dates, data]);
    });
  }
}