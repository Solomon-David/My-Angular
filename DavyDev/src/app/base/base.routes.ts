import {Routes,RouterModule} from '@angular/router'
import {HomePageComponent} from './homepage/homepage.component'
import { AuthPageComponent } from './auth-page/auth-page.component'
import { NgModule } from '@angular/core'
import {BaseComponent} from "./base.component"

const routes: Routes = [

        {path:"",
        
        component:BaseComponent,
        children:[
        { path: 'home', title:"Davy - Home Page", component: HomePageComponent} ,
        {path: 'auth', title:"Davy - Auth Page", component: AuthPageComponent},
        {path:"", redirectTo:"home", pathMatch:'full'}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BaseRoutes {}