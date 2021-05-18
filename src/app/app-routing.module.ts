import { ManageComponent } from './admin/manage/manage.component';
import { ProfileComponent } from './common/profile/profile.component';
import { AdminGuardGuard } from './admin/admin-guard.guard';
import { UserGuardGuard } from './user/user-guard.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: SignupComponent, pathMatch:'full'},
  { path: "login", component: LoginComponent },
  { path: "user", component: UserDashboardComponent,canActivate:[UserGuardGuard] },
  { path: "admin", component: AdminDashboardComponent ,canActivate:[AdminGuardGuard],children:[
    {path:"profile" ,component:ProfileComponent},
    {path:"manage" ,component:ManageComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
