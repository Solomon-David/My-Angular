import {Routes,RouterModule} from '@angular/router'
import {HomeComponent} from './home/home.component'
import { ChatsComponent } from './chats/chats.component'
import { NgModule } from '@angular/core'
import { UserComponent } from './user.component'
import { TasksComponent } from './tasks/tasks.component'

const routes: Routes = [

            {
                path:"",  component:UserComponent, children: [
                    {path:"chats", data:{title:" Chats"}, component: ChatsComponent},
                     {path:"home", data:{title:" Home"}, component:HomeComponent},
                     {path:"tasks", data:{title:" Tasks"}, component:TasksComponent},
                     {path:"", redirectTo:"home", pathMatch:"full"}
                    //{path:"user", component:UserComponent}
            ]
            // path:"user", component:UserComponent
        },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutes {}