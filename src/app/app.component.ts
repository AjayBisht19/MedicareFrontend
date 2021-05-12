import { Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn=false;
  user=null;
  constructor(public login:AuthServiceService,private router:Router){

  }
  ngOnInit():void{
    this.isLoggedIn=this.login.isLoggedIn()
    this.user=this.login.getUser()
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.login.isLoggedIn()
      this.user=this.login.getUser()
    })
  }
  title = 'Medicare';
  logout(){
    this.login.logout();
    // window.location.reload()
    this.router.navigate(['login'])
  }
}
