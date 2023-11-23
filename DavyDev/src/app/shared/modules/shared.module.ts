import { NgModule } from '@angular/core';

import { SwitchClassDirective } from './../directives/switch-class.directive'


@NgModule({
  imports:[],
  declarations: [SwitchClassDirective],
  
  exports:[
    SwitchClassDirective
  ]
})
export class SharedModule { }
