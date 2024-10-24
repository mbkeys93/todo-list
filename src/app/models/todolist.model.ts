import { Todo } from './todo.model';

export interface TodoList {
    date: Date; 
    todos: Todo[];
}