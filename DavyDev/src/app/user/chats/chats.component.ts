import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl,FormGroup} from "@angular/forms"
import { PersonService } from 'src/app/shared/services/person/person.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { BehaviorSubject } from 'rxjs';



interface Message {
  message: string,
  sender: string
}

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})


export class ChatsComponent implements OnInit,OnChanges{
  myForm = new FormGroup ({message:new FormControl("")})
  user: any={}
  newMessage: string="";
  messages: Message[] = [];
  messagess=new BehaviorSubject(this.messages)
    
            

  constructor(private person: PersonService,
    private message: MessageService){}

  sendMessage(){
    this.message.sendMessage(this.myForm.value.message);
    this.myForm.reset()
  }

  getMessages():void{
    this.message.getMessage().subscribe((message:any) =>{
      console.log(message)
      this.messages.push(message);
      this.messages=[...this.messages]
      this.messagess.next(this.messages)
      // console.log(this.messages)
    })
  }

  ngOnInit(): void {
    console.log("Initialized")
    this.user=this.person.getData()
    this.getMessages()
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log("changed")
    console.log(changes)
    this.getMessages()
  }

 

  
}
