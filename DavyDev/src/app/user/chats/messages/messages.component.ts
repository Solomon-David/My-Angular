import { Component, Input, ViewChildren, QueryList, ElementRef, OnChanges, SimpleChange, SimpleChanges } from "@angular/core";


interface Message {
    message: string,
    sender: string
  }

@Component({
    selector: "messages-component",
    templateUrl:"./messages.component.html",
    styleUrls: ["./messages.component.css"],
     
})



export class MessagesComponent implements OnChanges {
    @Input() messages:Message[]=[];
    @Input() user:any={}
    @ViewChildren("list", { read: ElementRef}) ul!:QueryList<ElementRef>;

   

   ngOnChanges(changes: SimpleChanges): void {
        
        if(this.ul?.last!=undefined && changes['messages']){
            setTimeout(() => {
                
                console.log(this.ul.last.nativeElement)
                this.ul.last.nativeElement.scrollIntoView()
            }, 100);
        }
    }

    tracker(index:number, item:any){
        return item.message
      }

}