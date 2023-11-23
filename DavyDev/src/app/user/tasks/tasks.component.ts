import { Component, OnInit } from '@angular/core';

interface Task{
    value: string,
    done: boolean
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    tasks: Task[]=[]
    filter:string=""
    query:string=""

    getFilter(text:string){
        this.filter=text
        
        if(this.filter=="all"){
            this.getTasks();
        }
        else if(this.filter=="done"){
            this.getTasks()
            let filtered=this.tasks.filter(val => val.done==true)
            this.tasks=filtered
            
        }
        else if(this.filter=="undone"){
            this.getTasks()
            let filtered=this.tasks.filter(val => val.done==false)
            this.tasks=filtered
            
        }
        
   
    }
    
    getQuery(text:string){
        this.query=text
        
        if(this.filter==""){
            this.getTasks;
        }
        else{
            let filtered=this.tasks.filter(val => val.value.includes(text))
            this.tasks=filtered
            
        }
    }

    addTask(task:string){
        
        this.tasks.push(<Task>{value:task,done:false})
        this.updateTasks()
    }

    removeTask(index:number){
        console.log(index)
        this.tasks.splice(index,1)
        
        this.updateTasks()
    }


    ngOnInit():void{
        this.getTasks()
    }

    getTasks(){
        if(localStorage.getItem("tasks")!=null ){
            this.tasks=JSON.parse(localStorage.getItem("tasks")!)
            
        }else{
            localStorage.setItem("tasks",JSON.stringify(this.tasks))
        }
        
    }

    toggleDone(index:number, done:boolean){
        this.tasks[index].done=done
        this.updateTasks()
    }

    editTask(index:number, text:string){
        this.tasks[index].value=text
        this.updateTasks()
        
    }

    updateTasks(){
        localStorage.setItem("tasks",JSON.stringify(this.tasks))
        this.getTasks()
        
    }
}

/*
window.onload = () =>{
    
    if(localStorage.getItem("tasks")==null){
        localStorage.setItem("tasks",JSON.stringify([Object({value:'', done:false})]))
    }
    console.log(localStorage.getItem("tasks"))
    var tasklist=JSON.parse(localStorage.getItem("tasks"))
        console.log("tasklist",tasklist)
        
    //for getting elements
    var tasks=document.querySelector(".taskbody");
    var empty=document.querySelector(".emptytask");
    var addBtn=document.querySelector(".addBtn");
    var addText=document.querySelector(".addText");
    var closeAdd=document.querySelector(".addBtn + .close");   
    var saveBtn=document.querySelector(".save");   
    var taskbody=document.querySelector(".taskbody");   
    var search=document.querySelector(".searchtools input");   
    var searchBtn=document.querySelector("#search");   
    var radios=document.querySelectorAll("input[type='radio']")
    var filterclose=document.querySelector(".filter .close");
    var filter=document.querySelector(".closed")
    var filterBtn=document.querySelector("#filterbtn")
    

    //button functions
    //for addBtn
    addBtn.addEventListener("click", function(){
        showComponent(".addInput","flex"); 
        addBtn.style.display="none"; 
        closeAdd.style.display="block";
    })
    
    //for close button of addInput
    closeAdd.addEventListener("click", function(){
        hideComponent(".addInput");
        addBtn.style.display="block"; 
        closeAdd.style.display="none";
    })

    //for adding tasks
    saveBtn.addEventListener("click", appendTask);
    addText.addEventListener("keyup", function(event){if(event.key=="Enter"){ appendTask()}});
    
    //for searching for tasks
    searchBtn.addEventListener("click", findTask);
    radios.forEach(element =>{
        element.addEventListener("change",findTask)
    })
    search.addEventListener("keyup", function(event){if(event.key=="Enter"){ findTask()}});


    //for opening filter
    filterBtn.addEventListener("click", function(){
        let isNone=filter.style.display=="none"
        if( isNone){
            showComponent(".closed","grid")
        }
        else{    
            hideComponent(".closed")
        }
        console.log(isNone)
        filterBtn.style.backgroundColor=(isNone)?"grey":"var(--primary-color)";
    })
   
    //functions
    //functions for taskbody
    function showComponent(selector,display){
        let component=document.querySelector(selector);
        component.style.display=display
        
    }
    
    function hideComponent(selector){
        let component=document.querySelector(selector);
        component.style.display="none"
        
    }

    function appendTask(){
        let task={}
        task.value=addText.value;
        task.done=false;
        tasklist.push(task)
        localStorage.setItem("tasks", JSON.stringify(tasklist))
        console.log(tasklist)
        renderTasks()
        addText.value=""
    }

    function removeTask(index){
        tasklist.splice(index,1);
        localStorage.setItem("tasks",JSON.stringify(tasklist))
        console.log(tasklist)
    }

    function markTask(index){        
        tasklist[index].done=!tasklist[index].done
        localStorage.setItem("tasks",JSON.stringify(tasklist))
        console.log(tasklist)
    }

    function renderTasks(){
        if(tasklist.length==0){
            taskbody.innerHTML=`<h2 >No Tasks</h2>`
        }
        else{
            taskbody.innerHTML="";
            for(let [index,task] of tasklist.entries()){
                taskbody.innerHTML+=``
            }
            let dels=document.querySelectorAll(".options .close");
            let checks=document.querySelectorAll(".options input[type='checkbox']");
            for(let index=0; index<dels.length; index++) {
                dels[index].addEventListener("click", function(){removeTask(index); renderTasks();})
                checks[index].addEventListener("change", function(){markTask(index); renderTasks();})
                checks[index].checked=tasklist[index].done;
            };
        }
        tasklist=JSON.parse(localStorage.getItem("tasks"))
        
    }

    //functions for searching for tasks
    function findTask(){
        let value=search.value.trim();
        let radio=document.querySelector("input[type='radio']:checked").value;
        console.log("radio,", radio)
        let list=[];
        for(let task of tasklist){
            if(task.value.includes(value)){
                if(radio=="done" && task.done){
                    
                        list.push(task);
                
                }
                else  if(radio=="undone" && !task.done){
                
                        list.push(task);
                
                }
                else{
                    if(radio=="all"){
                        list.push(task);
                    }
                }
            }
        }
        if(list.length>0){
            tasklist=[...list]
            console.log(list)
        }
        
        renderTasks()
    }

    //finally

    renderTasks()
}

/*
    Algorithms
    rendering tasks:
    1.check task array in localstorage
    for task, index in tasks
        1.pass task to component generator

    removing tasks:
    1. get index of task from button click function
    2. delete task by index
    3. render tasks

    adding tasks:
    1. get task of type string
    2. append task to tasklist
    3. save tasklist
    4. re-render tasks

    findtasks:
    1. get value of search input
    2. get value of radio
    3. for task in tasklist
        1. if task.contains(value) and radio.value==required value 
            1. add task to list
    4.then
    5.tasklist=list
    6. render tasks

*/

//To-Do: try to implement the algorithm


// localStorage.clear()
