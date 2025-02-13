export interface DbTodo {
  todo_id: number;        // Example MySQL column names
  todo_description: string;
  todo_date: string;
  is_completed: number;
  // ... other database columns
} 