import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from './chats.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";
import { SenderPipe } from '@pipes/sender.pipe';
import { SharedModule } from '@modules/shared.module';
import {MessagesComponent} from './messages/messages.component'
 

@NgModule({
  declarations: [
    ChatsComponent,
    SenderPipe,
    MessagesComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule,
   SharedModule
    
  ],
  exports: [
    ChatsComponent
  ],
  
  
  bootstrap:[ChatsComponent]
})
export class ChatsModule { }
