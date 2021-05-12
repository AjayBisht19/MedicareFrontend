import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { map } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CustomValidations {


    constructor(private ser: AuthServiceService, private http: HttpClient) {

    }

    // flag: boolean = false;

    // Oldunique(control: AbstractControl): ValidationErrors | null {
    //     if (this.ser.check(control.value)) {
    //         this.flag = true
    //     }
    //     return this.flag ? { unique: true } : null;
    // }


    unique(control: AbstractControl) {
        return this.checkUsernameNotTaken(control.value).pipe(
          map(res => {
              console.log("Asdfmna,sdf,")
              console.log(res);
            return res ?   null : { unique: true } ;
          })
        );
      }
    
      checkUsernameNotTaken(username: string): Observable<boolean> {
          
        return this.http.get(`http://localhost:8080/checkUsername/${username}`).pipe(
          map((usernameList: Array<any>) =>
            usernameList.filter(user => user.username === username)
          ),
          map(users => !users.length)
        );
      }
}