import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoList } from './models/todolist.model';
import { TodoListComponent } from './components/todolist/todolist.component';
import { TodoService } from './services/todo.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AddTodoGlobalComponent } from "./components/add-todo-global/add-todo-global.component";

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
    AddTodoGlobalComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'Todo List Application';
  todoListDates: Date[] = [];
  //test: Date = new Date(); // test date 

  constructor(public todoService: TodoService) {
    // convert to a set and back to an array to remove duplicates
    this.todoListDates = [ ...new Set(this.todoService.getTodoLists().map(list => list.date)) ];
  }
}
