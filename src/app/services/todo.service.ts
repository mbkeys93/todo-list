import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl)
      .pipe(
        map(todos => {
          //console.log('Raw todos from API:', todos);
          return todos.map(todo => {
            //console.log('Processing todo date:', todo.date, 'Type:', typeof todo.date);
            return {
              ...todo,
              date: new Date(todo.date)
            };
          });
        }),
        catchError(error => {
          console.error('Error fetching todos:', error);
          return throwError(() => error);
        })
      );
  }

  addTodoForDate(date: Date, description: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { date, description });
  }

  updateTodoCompletion(id: number, completedflag: number): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, { completedflag });
  }

  deleteTodoById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTodoListDates(): Observable<Date[]> {
    return this.getTodos().pipe(
      map(todos => [...new Set(
        todos.map(todo => todo.date.toISOString().split('T')[0])
      )].map(dateStr => new Date(dateStr)))
    );
  }

  getTodoListDummyDates(): Observable<Date[]> {
    const dummyDates = [
      new Date('2023-01-01'),
      new Date('2023-02-01'),
      new Date('2023-03-01'),
      new Date('2023-04-01'),
      new Date('2023-05-01')
    ];
    return of(dummyDates);
  }
}