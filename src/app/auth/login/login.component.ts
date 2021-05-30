import { AppComponent } from './../../app.component';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private loginService:AuthServiceService,private snack:MatSnackBar,private router: Router,private home:AppComponent) { 
    this.home.isLoggedIn=false
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
      
    });
  }
  submit(){
    this.loginService.generateToken(this.loginForm.value).subscribe((data: any)=>{     
      this.loginService.loginUser(data.token);
      this.loginService.getCurrentUser().subscribe((user:any)=>{
        this.loginService.setUser(user);
        if(this.loginService.getUserRole()=="admin"){
          this.loginService.loginStatusSubject.next(true)
          this.router.navigate(['/admin'])
        }else{
          this.loginService.loginStatusSubject.next(true)
          this.router.navigate(['/user'])
        }
      });
    }, error=>{
      console.log(error)
      this.snack.open('Invalid credentials!', 'Try again', {
        duration: 2000
      });
    })
  }
}

