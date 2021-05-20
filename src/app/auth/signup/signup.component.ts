import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;
  constructor(private http: HttpClient, private authService: AuthServiceService, private router: Router, private snack: MatSnackBar) { }
  username: any;
  flag: any;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      address: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required)
    });
  }

  submit() {
    this.flag = true
    this.checkUser()
  }

  // clear() {
  //   this.userForm.reset();
  // }
  async checkUser() {
    let res = await this.http.get(`http://localhost:8080/checkUsername/${this.username}`).toPromise();


    console.log("Res", res)
    this.flag = res;

    console.log("checking flag")
    console.log(this.flag)

    if (this.flag) {
      this.snack.open('Username already exist', 'OK', {
        duration: 2000
      });
    } else {
      console.log(this.authService.signup(this.userForm.value));
      swal.fire('Successfully Registered', "", 'success');
      this.router.navigate(['/login']);
    }
  }
}
