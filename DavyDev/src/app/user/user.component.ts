import { ThisReceiver } from "@angular/compiler";
import { Component, ViewChild } from "@angular/core";
import { Router, ActivatedRoute,NavigationEnd } from "@angular/router"
import { Title } from "@angular/platform-browser";
import { filter,map } from "rxjs";
// import { NavComponent } from './../shared/nav/nav.component'
import { PersonService } from 'src/app/shared/services/person/person.service';
import { MessageService } from "../shared/services/message/message.service";
import { ChatsComponent } from "./chats/chats.component"

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls:["./../shared/styles/main.css"]
})
 
export class UserComponent {

  @ViewChild(ChatsComponent) chats: ChatsComponent | undefined;
  user: any={};
  
  constructor(private person: PersonService,
    private message: MessageService,
    private router: Router,
            private activated: ActivatedRoute,
            
            private title: Title){}
 

    ngOnInit(): void {
      
        this.user=this.person.getData();
        this.message.setID(`${this.user.fname} ${this.user.lname}`)
        
    // this.chats?.getMessages()
    
    
    if(this.user){
      

  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
  )
  .subscribe(() => {
    var rt = this.getChild(this.activated)
    
    
    rt.data.subscribe((data:any)  => {
      console.log(data.title)
      this.title.setTitle(`${this.user.username} - ${data.title}`)
    })
    
  }
  )
}
}


getChild(acroute: ActivatedRoute):any{
    
  return (acroute.firstChild)? this.getChild(acroute.firstChild):acroute
  
}
    
}