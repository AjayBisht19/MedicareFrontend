import { product } from 'src/app/admin/manage/product';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private http: HttpClient) { }

  products: product[] = [];
main: product;
retrievedImage: any;
base64Data: any;
  retrieveResonse: any;

  ngOnInit(): void {
    this.http.get<object[]>(`http://localhost:8080/user/getCart`).subscribe((data: any) => {

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

  }

}
