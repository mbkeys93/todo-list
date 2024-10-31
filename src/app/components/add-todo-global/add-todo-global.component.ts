import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-add-todo-global',
  standalone: true,
  providers: [provideNativeDateAdapter(), TodoService],
  imports: [ MatFormFieldModule, FormsModule, MatInputModule, MatDatepickerModule ],
  templateUrl: './add-todo-global.component.html',
  styleUrl: './add-todo-global.component.css'
})
export class AddTodoGlobalComponent {
  @Output() newDateAdded = new EventEmitter<Date>();
  newTodoDate: Date = new Date();
  newTodoTitle: string = '';

  constructor(private todoService: TodoService) {}

  addTodo() {
    if (this.newTodoTitle.trim() === '') {
      // Handle validation error (e.g., show a message to the user)
      return;
    }

    this.todoService.getTodoListDates().subscribe(dates => { // unsubscribe?
      if (!dates.find(date => date === this.newTodoDate)) {
        this.newDateAdded.emit(this.newTodoDate);
      }
    });

    this.todoService.addTodoForDate(this.newTodoDate, this.newTodoTitle);
    this.newTodoTitle = ''; // Clear the input field
  }
}