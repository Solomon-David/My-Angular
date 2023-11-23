import { Injectable } from '@angular/core';
import { of, Observable, ReplaySubject } from 'rxjs';
import {io} from "socket.io-client";

interface Message {
  message: string,
  sender: string
}

@Injectable({
  providedIn: 'root'
})

 

export class MessageService {

  public message$ : ReplaySubject<Message> = new ReplaySubject(1);
  // public message$: Message[]=[]
  id: string = "Unknown"
 
socket = io("http://localhost:8080/");

  constructor() {


   }
   
  public sendMessage(message:any){
    let myid=this.id
    this.socket.emit("message", {message:message, sender:myid});
  }

  public getMessage(){
    this.socket.on("message", (message:Message)=>{
      this.message$.next(message);
    })
    return (this.message$.asObservable());
  }

  public setID(id:string):void{
    this.id=id
    
    this.socket.connect()
  }

  public exit(){
    this.socket.disconnect()
  }

}
