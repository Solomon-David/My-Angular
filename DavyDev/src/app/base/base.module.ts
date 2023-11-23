import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { BaseComponent } from './base.component';
import { HomePageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterComponent } from './router.component';
import { RouterModule } from '@angular/router';
import { BaseRoutes } from './base.routes';
import { SharedModule } from '../shared/modules/shared.module';

 

@NgModule({
  declarations: [
    AuthPageComponent,
    BaseComponent,
    HomePageComponent,
    RouterComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaseRoutes,
    SharedModule
  ],
  exports:[
    RouterModule,
    BaseComponent
  ],
  
  bootstrap: [BaseComponent]
})
export class BaseModule { }
