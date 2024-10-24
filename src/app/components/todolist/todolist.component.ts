import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoList } from '../../models/todolist.model'; 
import { TodoComponent } from '../todo/todo.component';
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
  standalone: true,
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
export class TodoListComponent {
  @Input() inputDate: any;
  newTodoTitle: string = '';
  newTodoDate: Date = new Date();
  todoList: TodoList = { date: new Date(), todos: [] };

  constructor(public todoService: TodoService) {
    //this.todoList = this.todoService.getTodoListForDate(this.inputDate);
  }

  ngOnInit() { 
    this.todoList = this.todoService.getTodoListForDate(this.inputDate);
} 

  addTodo() {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodoForDate(this.inputDate, this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }

  toggleTodoCompletion(date: Date, id: number) {
    this.todoService.toggleTodoCompletion(date, id);
  }

  deleteTodo(date: Date, id: number) {
    this.todoService.deleteTodoFromList(date, id);
  }
}