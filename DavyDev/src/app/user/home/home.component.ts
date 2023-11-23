import { Component, OnInit} from '@angular/core';
import { PersonService } from 'src/app/shared/services/person/person.service';
import {MessageService} from "./../../shared/services/message/message.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    user: any = {fname:String,
      lname: String,
      username:String,
      country:String,
      role: String};
      
    constructor(private person: PersonService,
                private message: MessageService){
     
      
    }

    

    ngOnInit(): void {
      this.user=this.person.getData();
     
  }
}
