import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'taskheader',
  templateUrl: './taskheader.component.html',
  styleUrls: ['./taskheader.component.css', "./../tasks.component.css"]
})
export class TaskheaderComponent {
  @Output() task: EventEmitter<string> = new EventEmitter()
  open:boolean=false

 

  addTask(task:string):void{
    this.task.emit(task)
  }

  
}
