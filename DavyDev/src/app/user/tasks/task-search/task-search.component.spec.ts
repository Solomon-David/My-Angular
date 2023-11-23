import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSearchComponent } from './task-search.component';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskSearchComponent]
    });
    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
