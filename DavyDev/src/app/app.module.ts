import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { UserModule } from './user/user.module';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterComponent} from './base/router.component';
import {HttpClientModule} from '@angular/common/http';
import { BaseRoutes } from './base/base.routes';
// import { NavComponent } from './sharednav/nav.component'
import { UserRoutes } from './user/user.routes';
import { BaseComponent } from './base/base.component';
import { PersonService } from './shared/services/person/person.service';
import { SharedModule } from './shared/modules/shared.module';
import { LoginGuard } from '@guards/login.guard';

@NgModule({
  declarations: [
    AppComponent,
     
    
    // NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserRoutes,
    ReactiveFormsModule,
    UserModule,
    BaseModule,
    BaseRoutes,
    HttpClientModule,
    SharedModule
  ],
  providers: [PersonService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
