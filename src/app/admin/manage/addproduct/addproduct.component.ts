import { AdminService } from './../../../services/admin.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  selectedFile: File;
  message: String;
  productForm: FormGroup;
  constructor(private router: Router,private adminService:AdminService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
      descr: new FormControl(''),
      seller: new FormControl(''),
      imageURL:new FormControl('')
    });
  }

 
  onUpload() {
        this.adminService.postData(this.productForm.value).toPromise().then(data => {
          console.log(data)
          swal.fire('Product added', "", 'success');
          window.location.reload();      
    },error=>{
      this.snack.open('Something went wrong', 'OK', {
        duration: 2000
      });
    })
  }


}
