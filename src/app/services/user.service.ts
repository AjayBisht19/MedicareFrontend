import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl=`http://localhost:8080`;

  getProducts(){
    return this.http.get<object[]>(`${this.baseUrl}/user/products`);
  }

  getCategories(){
    return this.http.get(`${this.baseUrl}/user/products/categories`);
  }



  getProduct(id){
    return this.http.get(`${this.baseUrl}/userProduct/${id}`)
  }

  addToCart(id){
    return this.http.get(`${this.baseUrl}/user/product/${id}/addToCart`,{responseType:'text'});
  }

  orderedProducts(){
    return this.http.get(`${this.baseUrl}/user/getOrderProducts`)
  }

  getCartProducts(){
    return this.http.get<object[]>(`${this.baseUrl}/user/getCart`);
  }
  getCartAmount(){
    return this.http.get(`${this.baseUrl}/user/cartAmount`);
  }

  updateAddress(address){
    return this.http.post(`${this.baseUrl}/user/changeAddress`, address)
  }

  removeFromCart(id){
    return this.http.delete(`${this.baseUrl}/user/product/${id}/removeFromCart`, { responseType: "text" })
  }

  createOrderSummary(id){
    return this.http.get(`${this.baseUrl}/user/createOrderSummary/${id}`, { responseType: 'text' })
  }

  createOrder(){
    return this.http.get(`${this.baseUrl}/user/createOrder`);
  }
}
