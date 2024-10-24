import { Injectable } from '@angular/core';
import { TodoList } from '../models/todolist.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) {}
  
  private todoLists: TodoList[] = [
    {
      date: new Date(2024, 9, 1),
      todos: [
        { id: 1, date: new Date(2024, 9, 1), description: 'Buy groceries', completed: false },
        { id: 2,date: new Date(2024, 9, 1), description: 'Walk the dog', completed: true }
      ]
    },
    {
      date: new Date(2024, 9, 2),
      todos: [
        { id: 3, date: new Date(2024, 9, 2), description: 'Read a book', completed: false },
        { id: 4, date: new Date(2024, 9, 2), description: 'Write some code', completed: true }
      ]
    }
  ];
  private nextId = this.getMaxId() + 1;

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // addTodoForDate(date: Date, description: string): Observable<Todo> {
  //   return this.http.post<Todo>(this.apiUrl, { date, description });
  // }

  // updateTodoCompletion(id: string, completed: boolean): Observable<Todo> {
  //   return this.http.put<Todo>(`${this.apiUrl}/${id}`, { completed });
  // }

  // deleteTodoById(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  getTodoLists(): TodoList[] {
    return this.todoLists;
  }

  getTodoListForDate(date: Date): TodoList {
    return this.todoLists.find(list => list.date === date) || { date, todos: [] };
  }

  getTodoListDates(): Date[] {
    return [ ...new Set(this.todoLists.map(list => list.date)) ];
  }

  addTodoList(date: Date): void {
    this.todoLists.push({ date, todos: [] });
  }

  addTodoForDate(date: Date, description: string): void {
    // Find the todo list for the given date
    let todoList = this.todoLists.find(list => list.date.getDate() === date.getDate());

    // If the todo list for the given date doesn't exist, create a new one
    if (!todoList) {
      todoList = { date, todos: [] };
      this.todoLists.push(todoList);
    }
    
    // move validation to component
    if (todoList.todos.find(todo => todo.description === description))  {      
      return;      
    }
    else if (description.trim() === '' || description === null || description === undefined || description.length > 50) {
      return;
    }
    else {    
      // Add the new todo to the todo list
      todoList.todos.push({ id: this.nextId++, date: date, description, completed: false });
    }
  }

  toggleTodoCompletion(date: Date, todoId: number): void {
    const todoList = this.todoLists.find(list => list.date === date);
    if (todoList) {
      const todo = todoList.todos.find(t => t.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }

  deleteTodoFromList(date: Date, todoId: number): void {
    const todoList = this.todoLists.find(list => list.date === date);
    if (todoList) {
      todoList.todos = todoList.todos.filter(t => t.id !== todoId);
    }
  }

  private getMaxId(): number {
    return this.todoLists.reduce((maxId, list) => {
      const maxTodoId = list.todos.reduce((max, todo) => Math.max(max, todo.id), 0);
      return Math.max(maxId, maxTodoId);
    }, 0);
  }
}
