import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OrdersComponent } from './user/orders/orders.component';
import { UserproductComponent } from './user/userhome/userproduct/userproduct.component';
import { CartComponent } from './user/cart/cart.component';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { HomeComponent } from './admin/home/home/home.component';
import { ProductComponent } from './admin/manage/product/product.component';
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
  { path: "aboutUs", component: AboutUsComponent },
  { path: "contactUs", component: ContactUsComponent },

  { path: "user", component: UserDashboardComponent,canActivate:[UserGuardGuard] ,children:[
    {path:"",component:UserhomeComponent},
    {path:"profile",component:ProfileComponent},
    {path:"cart",component:CartComponent},
    {path:"product/:id",component:UserproductComponent},
    {path:"orders",component:OrdersComponent}
  ]},
  
  { path: "admin", component: AdminDashboardComponent ,canActivate:[AdminGuardGuard],children:[
    {path:"" ,component:HomeComponent},
    {path:"profile" ,component:ProfileComponent},
    {path:"manage" ,component:ManageComponent},
    {path:"manage/product/:id",component:ProductComponent}  
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
