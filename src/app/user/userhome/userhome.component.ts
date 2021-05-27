import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/admin/manage/product';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  products: product[] = [];
  categories: [];
  main: product;
  search:String;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  allProducts: boolean;
  disDate = false;
  disPrice = false;
  baseUrl=`http://localhost:8080`;

  ngOnInit(): void {
    this.allProducts = true;
    this.http.get<object[]>(`${this.baseUrl}/user/products`).subscribe((data: any) => {

      this.products = [];
      data.forEach((pro: product) => {
        this.main = pro
        this.retrieveResonse = pro.image;
        this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
        this.products.push(this.main);
      })
    },error=>{
      console.log("error ",error);
    })

    this.http.get(`${this.baseUrl}/user/products/categories`).subscribe((data: any) => {
      this.categories = data;
    })
  }

  date() {
    this.disDate = true;
    this.disPrice = false;
    this.ngOnInit();
  }

  price() {
    this.disDate = false;
    this.disPrice = true;
    this.http.get<object[]>(`${this.baseUrl}/user/products/sortByPrice`).subscribe((data: any) => {
      this.products = [];
      data.forEach((pro: product) => {
        this.main = pro
        this.retrieveResonse = pro.image;
        this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
        this.products.push(this.main);
      })
    })
  }

  byCategory(category) {
    this.disDate = false;
    this.disPrice = false;
    this.allProducts = false;
    this.http.get<object[]>(`${this.baseUrl}/user/products/${category}`).subscribe((data: any) => {
      this.products = [];
      data.forEach((pro: product) => {
        this.main = pro
        this.retrieveResonse = pro.image;
        this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
        this.products.push(this.main);
      })
    })
  }

  searchByName(){
    this.allProducts = false;
    this.http.get(`${this.baseUrl}/user/product/${this.search}`).subscribe((data: any) => {
      this.products = [];
      data.forEach((pro: product) => {
        this.main = pro
        this.retrieveResonse = pro.image;
        this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
        this.products.push(this.main);
      })
    })
  }

}
