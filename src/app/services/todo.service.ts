import { Injectable } from '@angular/core';
import { TodoList } from '../models/todolist.model';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoLists: TodoList[] = [
    {
      date: new Date(2023, 9, 1),
      todos: [
        { id: 1, description: 'Buy groceries', completed: false },
        { id: 2, description: 'Walk the dog', completed: true }
      ]
    },
    {
      date: new Date(2023, 9, 2),
      todos: [
        { id: 3, description: 'Read a book', completed: false },
        { id: 4, description: 'Write some code', completed: true }
      ]
    }
  ];
  private nextId = this.getMaxId() + 1;

  getTodoLists(): TodoList[] {
    return this.todoLists;
  }

  getTodoListForDate(date: Date): TodoList {
    return this.todoLists.find(list => list.date === date) || { date, todos: [] };
  }

  addTodoList(date: Date): void {
    this.todoLists.push({ date, todos: [] });
  }

  addTodoForDate(date: Date, description: string): void {
    // Find the todo list for the given date
    let todoList = this.todoLists.find(list => list.date === date);

    // If the todo list for the given date doesn't exist, create a new one
    if (!todoList) {
      todoList = { date, todos: [] };
      this.todoLists.push(todoList);
    }

    let test = description.trim() === '' || description === null || description === undefined || description.length > 50; // test
    
    // move validation to component
    if (todoList.todos.find(todo => todo.description === description))  {      
      return;      
    }
    else if (description.trim() === '' || description === null || description === undefined || description.length > 50) {
      return;
    }
    else {    
      // Add the new todo to the todo list
      todoList.todos.push({ id: this.nextId++, description, completed: false });
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
