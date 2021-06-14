import { AdminService } from './../../../services/admin.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  selectedFile: File;
  message: String;
  productForm: FormGroup;

  constructor(private router: Router,@Inject(MAT_DIALOG_DATA) public data:any, private snack: MatSnackBar,private adminService:AdminService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
      descr: new FormControl(''),
      seller: new FormControl(''),
      imageURL: new FormControl('')
    });

  
  }
 
  onUpload(e:Event) {
    e.preventDefault();
        this.adminService.updateData(this.data.product.id, this.productForm.value).toPromise().then(data => {
          console.log("product form " ,this.productForm.value)
          swal.fire('Product updated', "", 'success');
          window.location.reload();
        },error=>{
      this.snack.open('Something went wrong!', 'OK', {
        duration: 2000
      });
    })
  }
}
