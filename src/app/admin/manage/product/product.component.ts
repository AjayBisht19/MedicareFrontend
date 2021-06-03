import { AdminService } from './../../../services/admin.service';
import { EditproductComponent } from './../editproduct/editproduct.component';
import { MatDialog } from '@angular/material/dialog';
import { product } from './../product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private route: ActivatedRoute,private adminService:AdminService, private dialog: MatDialog) { }
  product:product
  retrieveResonse:string
  public id: any;
  ngOnInit(): void {
     this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.adminService.getProduct(this.id).subscribe((data:any)=>{
      this.product=data;
      this.retrieveResonse = data.image;
      this.product.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
    })    
  }

  openDialog(){
    console.log("edit")
    this.dialog.open(EditproductComponent,{data:{product:this.product}});
  }

}
