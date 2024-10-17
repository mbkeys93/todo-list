import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model'; 
import { TodoComponent } from '../todo/todo.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  standalone: true,
  imports: [TodoComponent, FormsModule]
})
export class TodoListComponent {
  newTodoTitle: string = '';
  todos: Todo[] = [];

  constructor(public todoService: TodoService) {
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }

  toggleTodoCompletion(id: number) {
    this.todoService.toggleTodoCompletion(id);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}