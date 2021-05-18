import { Router } from '@angular/router';
import { product } from './product';
import { HttpClient } from '@angular/common/http';
import { AddproductComponent } from './addproduct/addproduct.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  openDialog() {
    this.dialog.open(AddproductComponent);
  }

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {

  }

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

  ngOnInit(): void {
    this.allProducts = true;
    this.http.get<object[]>(`http://localhost:8080/products`).subscribe((data: any) => {
      this.products = [];
      data.forEach((pro: product) => {
        this.main = pro
        this.retrieveResonse = pro.image;
        this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
        this.products.push(this.main);
      })
    })

    this.http.get(`http://localhost:8080/products/categories`).subscribe((data: any) => {
      this.categories = data;
    })
  }

  displayedColumns: string[] = ['image', 'name', 'unit price', 'quantity', 'description', 'action'];
  dataSource = this.products;

  delete(id) {
    console.log(id);
    this.http.delete(`http://localhost:8080/admin/product/${id}`).subscribe(data => {
    })
    this.router.navigate(['/admin']);
  }

  active(id) {
    this.http.patch(`http://localhost:8080/admin/product/${id}`, null).subscribe();
  }

  date() {
    this.disDate = true;
    this.disPrice = false;
    this.ngOnInit();
  }

  price() {
    this.disDate = false;
    this.disPrice = true;
    this.http.get<object[]>(`http://localhost:8080/products/sortByPrice`).subscribe((data: any) => {
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
    this.http.get<object[]>(`http://localhost:8080/products/${category}`).subscribe((data: any) => {
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
    this.http.get(`http://localhost:8080/product/${this.search}`).subscribe((data: any) => {
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
