import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
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
    return this.http.get<Date[]>(this.apiUrl);
  }
}