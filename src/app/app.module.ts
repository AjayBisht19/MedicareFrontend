import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupComponent } from './auth/signup/signup.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './auth/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import { ProfileComponent } from './common/profile/profile.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ManageComponent } from './admin/manage/manage.component';
import { AddproductComponent } from './admin/manage/addproduct/addproduct.component';
import { ProductComponent } from './admin/manage/product/product.component';
import { EditproductComponent } from './admin/manage/editproduct/editproduct.component';
import { HomeComponent } from './admin/home/home/home.component';
import { UsersidebarComponent } from './user/usersidebar/usersidebar.component';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { CartComponent } from './user/cart/cart.component';
import { UserproductComponent } from './user/userhome/userproduct/userproduct.component';
import { OrdersComponent } from './user/orders/orders.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    ManageComponent,
    AddproductComponent,
    ProductComponent,
    EditproductComponent,
    HomeComponent,
    UsersidebarComponent,
    UserhomeComponent,
    CartComponent,
    UserproductComponent,
    OrdersComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTableModule,
    MatBadgeModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressBarModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
