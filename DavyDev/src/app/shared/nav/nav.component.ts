import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/message/message.service';
import { PersonService } from '@services/person/person.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', ]
})

export class NavComponent {
    constructor(private router: Router,
      private person:PersonService,
      private message: MessageService){}

      logOut(){
      
        this.person.logout()
        this.router.navigate(["/"])
      }
}
