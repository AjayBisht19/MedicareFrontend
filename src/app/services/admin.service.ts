import { product } from './../admin/manage/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  
  baseUrl = `http://3.92.210.35:7011`;

  getProducts(){
    return this.http.get(`${this.baseUrl}/products`);
  }

  getCategories(){
    return this.http.get(`${this.baseUrl}/products/categories`);
  }

  deleteProduct(id){
    return this.http.delete(`${this.baseUrl}/admin/product/${id}`, { responseType: 'text' });
  }

  toggleActivate(id){
    return this.http.patch(`${this.baseUrl}/admin/product/${id}`, null, { responseType: "text" });
  }


  getProduct(id){
    return this.http.get(`${this.baseUrl}/admin/product/${id}`);
  }
 

  updateData(id,productValues){
    return this.http.post(`${this.baseUrl}/admin/product/${id}/editData`,productValues);
  }

 

  postData(productValues){
    return this.http.post(`${this.baseUrl}/admin/uploadData/`, productValues)
  }
}
