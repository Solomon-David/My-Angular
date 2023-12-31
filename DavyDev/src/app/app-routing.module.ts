import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '@guards/login.guard';

const routes: Routes = [
    {path:"", loadChildren:()=>import("./base/base.module")
  .then(m=>m.BaseModule)}
    ,
  {path: "user",
  canActivate:[LoginGuard()],
   loadChildren: ()=>import("./user/user.module")
.then(m => m.UserModule) }
 
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
