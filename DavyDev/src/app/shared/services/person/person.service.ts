import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of, BehaviorSubject } from 'rxjs';
import { MessageService } from '@services/message/message.service';



@Injectable({
  providedIn: 'root'
})



export class PersonService {
  fname: String;
    lname: String;
    username:String;
    country:String;
    role:String;
    private isLoggedIn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false) 
  
  // person!:{fname:" ",
  //   lname: " ",
  //   username:" ",
  //   country:" ",
  //   role:" "};
  

  constructor(private http: HttpClient,
    private message: MessageService) { 
    this.fname='';
    this.lname='';
    this.username='';
    this.country='';
    this.role='';

  }

  public loginUser(username:any, password:any):void{

    
    let headers={"content-type":"application/json"}
    this.http.post<any>("http://localhost:8080/login",
    JSON.stringify({"username":username, "password":password}),
    {headers: headers, observe:"body"})
    .subscribe(
      (response)=>{
        if(response['accepted']){
          this.setData(response.data)
          
        }
        else{
          this.isLoggedIn.next(false)
        }
      },
       
      (error)=>{
        console.log(error)
      },
      () =>{
        console.log("Done")
        console.log("isLoggedIn",this.isLoggedIn.getValue())
      }
      ) 
  }

  public loggedIn():Observable<boolean>{

    return this.isLoggedIn.asObservable()
  }
  
  public setData(data:{fname:String,
    lname: String,
    username:String,
    country:String,
    role:String} ){
      console.log(data)
     this.fname=data.fname
      this.lname=data.lname
      this.username=data.username
      this.country=data.country
      this.role=data.role
      this.isLoggedIn.next(true)
  }

  public logout(){
    this.fname=""
      this.lname=""
      this.username=""
      this.country=""
      this.role=""
      this.isLoggedIn.next(false)
      this.message.exit()
      
      console.log("Logged out")
  }

  public getData(): Object{
   
    return this
  }
}
