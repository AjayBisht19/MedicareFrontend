import { EditproductComponent } from './../editproduct/editproduct.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { product } from './../product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private route: ActivatedRoute,private http:HttpClient, private dialog: MatDialog) { }
  product:product
  retrieveResonse:string
  public id: any;
  ngOnInit(): void {
     this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.http.get(`http://localhost:8080/admin/product/${this.id}`).subscribe((data:any)=>{
      this.product=data;
      this.retrieveResonse = data.image;
      this.product.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
    })    
  }

  openDialog(){
    console.log("edit")
    this.dialog.open(EditproductComponent,{data:{id:this.product}});
  }

}
