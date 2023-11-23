import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import { PersonService } from 'src/app/shared/services/person/person.service';

export interface resp {
  accepted: boolean,
  data: Object
}

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./../base.component.css']
})

export class AuthPageComponent {
      title1="Authentication Page"
      login=true
      message=''

     constructor(
       private router: Router,
       public http:HttpClient,
        private person: PersonService
        ){}

      toLogin(){
        this.login=true
       
      }

      toSignUp(){
        this.login=false

      }
       
      userLogin=new FormGroup({
        username: new FormControl('',[Validators.required]),
        password: new FormControl('', [Validators.required])
      })

      LoginUser(){
      
        let username=this.userLogin.value.username
        let password=this.userLogin.value.password
        
        
        this.message=`username: ${username} password:${password}`
        this.message="Loading"
        this.person.loginUser(username, password) 
        
        this.person.loggedIn().subscribe((a)=>{

        if(a){
          this.message="Logged in"
          setTimeout(()=>{
            this.router.navigate(["/user"])
          }, 1000)
        }
        else{
          
          this.message="Invalid Credentials"
        }
      }
        )

        
          
       /*}
        else{
          this.message+='authenication error'
        }*/
      }

      userSignUp=new FormGroup({
        firstname: new FormControl('',[Validators.required]),
        lastname: new FormControl('',[Validators.required]),
        username: new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required])
      })

      SignUpUser(){
        this.message=JSON.stringify(this.userSignUp.value)
      }

       

}
