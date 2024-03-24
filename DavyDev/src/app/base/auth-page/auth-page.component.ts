import { Component, effect, signal} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import { PersonService } from 'src/app/shared/services/person/person.service';
// import {signal} from 'signal';

export interface resp {
  accepted: boolean,
  data: Object
}

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./../base.component.css'],
  
})

export class AuthPageComponent { 
      title1="Authentication Page"
      login=true
      message=''
      valid=signal<string>("Login")
      loading=signal(false)

     constructor(
       private router: Router,
       public http:HttpClient,
        private person: PersonService
        ){
          effect(()=>{
            console.log("Valid", this.valid())
          })
        }

      toLogin(){
        this.login=true
       
      }

      toSignUp(){
        this.login=false

      }

      checkValid(){
        if((this.userLogin.get("username")?.valid || this.userLogin.get("password")?.valid) && !this.userLogin.valid){
          this.valid.set("1/2")
          
        }
        else if(this.userLogin.valid){
          this.valid.set("valid")
        }
        
      }
       
      userLogin=new FormGroup({
        username: new FormControl('',[Validators.required]),
        password: new FormControl('', [Validators.required])
      })

      LoginUser(){

          this.loading.set(true);
          
          
          let username=this.userLogin.value.username
          let password=this.userLogin.value.password
          
          
          this.message=`username: ${username} password:${password}`
        this.message="Loading"
        this.person.loginUser(username, password) 
        this.person.loggedIn().subscribe((a)=>{

        if(a){
          this.message="Logged in"
          this.loading.set(false)
          setTimeout(()=>{
            this.router.navigate(["/user"])
          }, 1000)
        }
        else{
          
          this.loading.set(false)
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
