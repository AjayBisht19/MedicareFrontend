import { UserService } from './../../services/user.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { product } from 'src/app/admin/manage/product';
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
  constructor(private userService:UserService, private snack: MatSnackBar) { }
  
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

    this.userService.getCartProducts().subscribe((data: any) => {
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

    this.userService.getCartAmount().subscribe((data: any) => {
      this.totalAmount = data
    })

  }

  changeAddress() {
    if (this.address.value['add']) {
      this.userService.updateAddress( this.address.value['add']).subscribe((data: any) => {
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

    this.userService.removeFromCart(id).subscribe(data => {
      console.log(data)
      window.location.reload();
      this.snack.open('Item removed', 'OK', {
        duration: 2000
      });
    })
  }

  orderSummary(id) {
    this.userService.createOrderSummary(id).subscribe((data: any) => {
      console.log("sent order request")
      console.log(data)

    })
  }

  placeOrder() {
    console.log("Place order");
    this.userService.createOrder().subscribe((data: any) => {
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
          "handler": (response) => {
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);

            console.log("sending order request")
            this.orderSummary(data.id);
            window.location.reload();
            swal.fire('Payment successful!', "Check your order summary", 'success');
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


