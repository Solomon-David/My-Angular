import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, signal, AfterContentChecked, effect} from '@angular/core';
import {FormControl,FormGroup} from "@angular/forms"
import { PersonService } from 'src/app/shared/services/person/person.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { BehaviorSubject, Subscription } from 'rxjs';



interface Message {
  message: string,
  sender: string
}

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})


export class ChatsComponent implements OnInit, OnDestroy{
  myForm = new FormGroup ({message:new FormControl("")})
  user: any={}
  newMessage: string="";
  // messages: Message[] = [];
  // messagess=new BehaviorSubject(this.messages)
  messages=signal<Message[]>([])
  messagesSub: Subscription
            

  constructor(private person: PersonService,
    private message: MessageService){
      effect(()=>{
        console.log(this.messages())
      })
    }

  sendMessage(){
    this.message.sendMessage(this.myForm.value.message);
    this.myForm.reset()
  }

  getMessages():void{
    
  }

  ngOnInit(): void {
    console.log("Initialized")
    this.user=this.person.getData()
    console.log(this.messages)
    // this.getMessages()
    this.messagesSub = this.message.getMessage().subscribe((message:any) =>{
      console.log(message)
      // this.messages.push(message);
      // this.messages=[...this.messages]
      // this.messagess.next(this.messages)
      this.messages.update(arr => [...arr, message])
      // console.log(this.messages)
    }, )
  }
  
 

  ngOnDestroy(): void {
    this.messagesSub.unsubscribe()
  }

 

  
}
