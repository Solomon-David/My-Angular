import { inject } from "@angular/core";
import {Router, CanActivateFn} from "@angular/router"
import { PersonService } from "../services/person/person.service";


export function LoginGuard(): CanActivateFn {
    return () =>{
    let router= inject(Router)
     let person=inject(PersonService)
     
     let enter:boolean=false;
     person.loggedIn().subscribe(
         (bool)=>{
             enter=bool
         }
     )
     if(enter){
         console.log(person.loggedIn())
         console.log("enter", person.getData())
         
         return true
        }
        else{
            console.log("log in first")
            
            router.navigate(["/auth"])
            return false
        }
    
    }
}