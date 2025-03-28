import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
    selector: 'app-add-todo-dialog',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [MatFormFieldModule, FormsModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatDialogModule],
    template: `
        <h2 mat-dialog-title>Add New Todo</h2>
        <mat-dialog-content>
            <mat-form-field appearance="fill" class="full-width">
                <mat-label>Todo Date</mat-label>
                <input matInput [matDatepicker]="picker" [(ngModel)]="todoDate">
                <mat-hint>MM/DD/YYYY</mat-hint>
                <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
            <mat-form-field appearance="fill" class="full-width">
                <mat-label>New Todo</mat-label>
                <input matInput [(ngModel)]="todoTitle" placeholder="Enter todo description">
            </mat-form-field>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button (click)="onCancel()">Cancel</button>
            <button mat-raised-button color="primary" (click)="onSubmit()">Add</button>
        </mat-dialog-actions>
    `,
    styles: [`
        .full-width {
            width: 100%;
        }
        mat-dialog-content {
            min-width: 350px;
        }
    `]
})
export class AddTodoDialogComponent {
    todoDate = new Date();
    todoTitle = '';

    constructor(private dialogRef: MatDialogRef<AddTodoDialogComponent>) {}

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.todoTitle.trim()) {
            this.dialogRef.close({
                date: this.todoDate,
                description: this.todoTitle
            });
        }
    }
} 