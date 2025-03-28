import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';

@Component({
    selector: 'app-add-todo-global',
    imports: [MatButtonModule, MatIconModule],
    template: `
        <button mat-fab color="primary" (click)="openDialog()">
            <mat-icon>add</mat-icon>
        </button>
    `,
    styles: [`
        button {
            position: fixed;
            bottom: 20px;
            right: 20px;
        }
    `]
})
export class AddTodoGlobalComponent {
    newDateAdded = output<Date>();

    constructor(private dialog: MatDialog) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(AddTodoDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.newDateAdded.emit(result.date);
            }
        });
    }
}