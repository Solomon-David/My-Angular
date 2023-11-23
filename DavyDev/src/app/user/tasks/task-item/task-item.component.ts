import { Component, ViewChild, EventEmitter, Input, Output, TemplateRef, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements AfterViewInit {
  @Input() task: string="";
  @Input() done: boolean=false;
  @Input() index: number=0;
  
  @Output() doneChange:EventEmitter<boolean> = new EventEmitter();
  @Output() taskChange:EventEmitter<string> = new EventEmitter();
  @Output() kill: EventEmitter<number>= new EventEmitter<number>();

  @ViewChild("input", {read:ElementRef}) input!: ElementRef ;
  @ViewChild("taskedit", {read:ElementRef}) taskedit!: ElementRef<any> ;
  edit=false;

 
  removeSelf(){
    this.kill.emit(this.index)
  }

  toggleEdit(){
    this.edit=!this.edit
    if(this.edit==false){
      
      this.taskChange.emit(this.taskedit.nativeElement.value)
    }
  }

  change(){
    let check=this.input.nativeElement.checked
    
    this.doneChange.emit(this.input.nativeElement.checked)
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.checked=this.done
  }

}

//resolve the checked issue
