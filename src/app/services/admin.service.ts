import { product } from './../admin/manage/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  

  async getProducts(){
    await this.http.get<object[]>(`http://localhost:8080/products`).toPromise();
  }
}
