import { logging } from 'protractor';
import { HttpHandler } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { product } from 'src/app/admin/manage/product';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var Razorpay: any;

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
      this.http.post(`http://localhost:8080/user/changeAddress`, this.address.value['add']).subscribe((data: any) => {
        console.log(data)
        localStorage.removeItem("user")
        localStorage.setItem("user", JSON.stringify(data))
        console.log("user ", localStorage.getItem("user"))
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

  orderSummary(id){
    this.http.get(`http://localhost:8080/user/createOrderSummary/${id}`,{responseType:'text'}).subscribe((data: any) => {
      console.log("sent order request")
      console.log(data)

    })
  }

  placeOrder() {
    console.log("Place order");
    this.http.get(`http://localhost:8080/user/createOrder`).subscribe((data: any) => {
      console.log("success ", data)
      
      console.log(data.status)
      if (data.status == "created") {

        
        let options = {
          key: 'rzp_test_YRVcjR7aOtyudM',
          amount: data.amount,
          currency: 'INR',
          name: 'Medicare',
          description: 'Order payment',
          image: '',
          order_id: data.id,
          "handler":  (response)=> {
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature); 
            
            console.log("sending order request")
            this.orderSummary(data.id);
            window.location.reload();
            swal.fire('Payment successful!', "Order details are sent to your mail", 'success');
          },
          "prefill": {
            "name": "",
            "email": "",
            "contact": ""
          },
          "notes": {
            "address": "Medicare ..."
          },
          "theme": {
            "color": "#3399cc"
          },
        };

        let rzp = new Razorpay(options);
        rzp.on('payment.failed', function (response) {
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          swal.fire('Payment failed!', "", 'error');

        });

        rzp.open();
      
        
      }
     

    }, error => {
      console.log("Error ", error.message)
      alert("Something went wrong")
    })

  }

}


