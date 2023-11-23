import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TaskSearchComponent } from './task-search/task-search.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { FormsModule } from '@angular/forms';
import { TaskheaderComponent } from './taskheader/taskheader.component';



@NgModule({
  declarations: [
    TasksComponent,
    TaskSearchComponent,
    TaskItemComponent,
    TaskheaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TasksModule { }
