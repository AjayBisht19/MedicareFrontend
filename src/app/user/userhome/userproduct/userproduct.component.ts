import { UserService } from './../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/admin/manage/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';

@Component({
  selector: 'app-userproduct',
  templateUrl: './userproduct.component.html',
  styleUrls: ['./userproduct.component.css']
})
export class UserproductComponent implements OnInit {

  constructor(private route: ActivatedRoute,private userService:UserService, private router: Router,private snack: MatSnackBar) { }
  product:product
  retrieveResonse:string
  public id: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.userService.getProduct(this.id).subscribe((data:any)=>{
      this.product=data;
      this.retrieveResonse = data.image;
      this.product.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
    })  
  }

  addToCart(id){
    this.userService.addToCart(id).subscribe(data=>{
      console.log(data);
      swal.fire('Item added to Cart', "", 'success');
      this.router.navigate(['/user/cart']);
    },(error:any)=>{
      console.log(error.message)
      this.snack.open('Item is already in cart', 'OK', {
        duration: 2000
      });
    })
  }

}
