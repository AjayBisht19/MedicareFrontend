import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public loginStatusSubject=new Subject<boolean>();
  constructor(private http:HttpClient) { }
 
 baseURL="http://3.92.210.35:7011";

 checkUsername(username){
   return this.http.get(`${this.baseURL}/checkUsername/${username}`);
 }

 getCurrentUser(){  
   console.log(this.http.get(`${this.baseURL}/currentUser`))
   return this.http.get(`${this.baseURL}/currentUser`);
 }

  signup(user:object){
    this.http.post(`${this.baseURL}/signup`,user).subscribe(data=>{
      return data;
    });
  }

  generateToken(user){
    return this.http.post(`${this.baseURL}/token`,user);
  }

  loginUser(token:any){
    localStorage.setItem("token",token);
  
    return true;
  }

  isLoggedIn(){
    let tokenStr=localStorage.getItem("token");
    if(tokenStr == "" || tokenStr==undefined || tokenStr==null)
      return false
    return true
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  getToken(){
    return localStorage.getItem("token");
  }

  setUser(user){
    localStorage.setItem("user",JSON.stringify(user))
  }

  getUser(){
    let user=localStorage.getItem("user");
    if(user!=null){
      return JSON.parse(user);
    }else{
      this.logout()
      return false;
    }
  }

  getUserRole(){
    let user = this.getUser();
    return user.role;
  }
}
