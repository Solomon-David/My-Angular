import { ThisReceiver } from "@angular/compiler";
import { Component } from "@angular/core";
import { Router, ActivatedRoute,NavigationEnd } from "@angular/router"
import { Title } from "@angular/platform-browser";
import { filter,map } from "rxjs";
// import { NavComponent } from './../shared/nav/nav.component'
import { PersonService } from 'src/app/shared/services/person/person.service';
import { MessageService } from "../shared/services/message/message.service";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls:["./../shared/styles/main.css"]
})
 
export class UserComponent {

    user: any={};

    constructor(private person: PersonService,
                private message: MessageService,
                private router: Router,
            private activated: ActivatedRoute,
            private title: Title){}
 

    ngOnInit(): void {
      
        this.user=this.person.getData();
        this.message.setID(`${this.user.fname} ${this.user.lname}`)
        
    
    
    
    
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