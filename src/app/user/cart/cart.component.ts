import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { product } from 'src/app/admin/manage/product';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalAmount: number;
  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  address: FormGroup;
  products: product[] = [];
  main: product;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  cartLength: number;
 
  

  ngOnInit(): void {
    
    this.address = new FormGroup({
        add: new FormControl('', Validators.required)        
      });

    this.http.get<object[]>(`http://localhost:8080/user/getCart`).subscribe((data: any) => {  
      this.products = [];
      data.forEach((pro: product) => {
        this.main = pro
        this.retrieveResonse = pro.image;
        this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
        this.products.push(this.main);
      })
      this.cartLength = this.products.length;
    }, error => {
      console.log("error ", error);
    })

    this.http.get(`http://localhost:8080/user/cartAmount`).subscribe((data: any) => {
      this.totalAmount = data
    })

  }

  changeAddress() {
    if (this.address.value['add']) {
      this.http.post(`http://localhost:8080/user/changeAddress`,this.address.value['add']).subscribe((data:any)=>{
        console.log(data)
        localStorage.removeItem("user")
        localStorage.setItem("user",JSON.stringify(data))
        console.log("user ",localStorage.getItem("user"))
        this.snack.open('Address changed', 'OK', {
          duration: 2000
        });
      })
    }
  }

  remove(id) {
    console.log(id)

    this.http.delete(`http://localhost:8080/user/product/${id}/removeFromCart`, { responseType: "text" }).subscribe(data => {
      console.log(data)
      window.location.reload();
      this.snack.open('Item removed', 'OK', {
        duration: 2000
      });
    })
  }

}
