import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css'],
  animations:[
    trigger("shrink",[
      state("true", style({
         transform:"scaleY(1)"
      })),
      state("false", style({
        transform:"scaleY(0)"
      })),
      transition("false <=> true", animate(300))
    ]),
  
  
    trigger("fade", [
      state("true", style({
        backgroundColor:"purple"
      })),
      state("false", style({
        backgroundColor:"grey"
      })),
      transition("false <=> true", animate(300))
    ])
  ]
})
export class TaskSearchComponent {
  @Output() filter: EventEmitter<string> = new EventEmitter();
  @Output() query: EventEmitter<string> = new EventEmitter();

  queryText:string=""
  showFilter:boolean=false

  switch(){
    this.showFilter=!this.showFilter
    console.log(this.showFilter)
  }

  filterTasks(event:any){
    
    this.filter.emit(event.target.value)
  }

  search(){
    
    this.query.emit(this.queryText)
  }

}
