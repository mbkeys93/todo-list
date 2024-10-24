import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoGlobalComponent } from './add-todo-global.component';

describe('AddTodoGlobalComponent', () => {
  let component: AddTodoGlobalComponent;
  let fixture: ComponentFixture<AddTodoGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoGlobalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTodoGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
