import { Component, output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
    selector: 'app-add-todo-global',
    providers: [provideNativeDateAdapter(), TodoService],
    imports: [MatFormFieldModule, FormsModule, MatInputModule, MatDatepickerModule],
    templateUrl: './add-todo-global.component.html',
    styleUrl: './add-todo-global.component.css'
})
export class AddTodoGlobalComponent {
  newDateAdded = output<Date>();
  newTodoDate = signal(new Date());
  newTodoTitle = signal('');

  constructor(private todoService: TodoService) {}

  addTodo() {
    if (this.newTodoTitle().trim() === '') {
      // Handle validation error (e.g., show a message to the user)
      return;
    }

    this.todoService.getTodoListDates().subscribe(dates => { // unsubscribe?
      if (!dates.find(date => date === this.newTodoDate())) {
        this.newDateAdded.emit(this.newTodoDate());
      }
    });

    this.todoService.addTodoForDate(this.newTodoDate(), this.newTodoTitle());
    this.newTodoTitle.set(''); // Clear the input field
  }
}