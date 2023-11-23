import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import {UserRoutes} from './user.routes';
import { NavComponent } from './../shared/nav/nav.component';
import { HomeModule } from './home/home.module';
import { ChatsModule } from './chats/chats.module';
import { TasksModule } from './tasks/tasks.module';
import {MessageService} from "./../shared/services/message/message.service";





@NgModule({
  declarations: [
    UserComponent,
   NavComponent,
   
  ],
  imports: [
    CommonModule,
    UserRoutes,
    HomeModule,
    ChatsModule,
    TasksModule
  ],
  exports: [
    RouterModule,
    UserComponent
  ],
  providers:[MessageService],
  
  bootstrap:[UserComponent]
})
export class UserModule { }

//Bootstrap basecomponent and load it when the app starts up