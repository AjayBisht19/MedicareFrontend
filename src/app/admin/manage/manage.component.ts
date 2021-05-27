import { Router } from '@angular/router';
import { product } from './product';
import { HttpClient } from '@angular/common/http';
import { AddproductComponent } from './addproduct/addproduct.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  openDialog() {
    this.dialog.open(AddproductComponent);
  }

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router, private snack: MatSnackBar) {

  }
  baseUrl = `http://localhost:8080`;
  products: product[] = [];
  categories: [];
  main: product;
  search: String;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  allProducts: boolean;
  disDate = false;
  disPrice = false;

  ngOnInit(): void {
    this.allProducts = true;
    this.http.get<object[]>(`${this.baseUrl}/products`).subscribe((data: any) => {
      this.products = [];
      data.forEach((pro: product) => {
        this.main = pro
        this.retrieveResonse = pro.image;
        this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
        this.products.push(this.main);
      })
    })

    this.http.get(`${this.baseUrl}/products/categories`).subscribe((data: any) => {
      this.categories = data;
    })
  }



  delete(id) {
    console.log(id);
    this.http.delete(`${this.baseUrl}/admin/product/${id}`, { responseType: 'text' }).subscribe(data => {
    })
    window.location.reload();
    this.snack.open('Item deleted', 'OK', {
      duration: 2000
    });
  }

  active(id) {
    this.http.patch(`${this.baseUrl}/admin/product/${id}`, null, { responseType: "text" }).subscribe(data => {
      this.snack.open('Status changed', 'OK', {
        duration: 2000
      });
    });
  }

  date() {
    this.disDate = true;
    this.disPrice = false;
    this.ngOnInit();
  }

  price() {
    this.disDate = false;
    this.disPrice = true;
    this.http.get<object[]>(`${this.baseUrl}/products/sortByPrice`).subscribe((data: any) => {
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
    this.allProducts = false;
    this.http.get<object[]>(`${this.baseUrl}/products/${category}`).subscribe((data: any) => {
      this.products = [];
      data.forEach((pro: product) => {
        this.main = pro
        this.retrieveResonse = pro.image;
        this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
        this.products.push(this.main);
      })
    })
  }

  searchByName() {
    this.allProducts = false;
    this.http.get(`${this.baseUrl}/product/${this.search}`).subscribe((data: any) => {
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
