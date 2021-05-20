import { product } from './../product';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  selectedFile: File;
  message: String;
  productForm: FormGroup;
  constructor(private httpClient: HttpClient,private router: Router,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
      descr: new FormControl(''),
      seller: new FormControl(''),
    });
  }

  public onFileChanged(event) {
    console.log("change file")
    this.selectedFile = event.target.files[0];
  }
 
  onUpload() {
    const uploadImageData = new FormData();
    uploadImageData.append('image', this.selectedFile, this.selectedFile.name);    
    this.httpClient.post(`http://localhost:8080/admin/product/${this.data.product.id}/editImage`, uploadImageData).subscribe((dat: any) => {
     }, (data: any) => {
      console.log("response status ", data.status)
      if (data.status == 200) {
        this.httpClient.post(`http://localhost:8080/admin/product/${this.data.product.id}/editData`, this.productForm.value).toPromise().then(data => {
          console.log("product form " ,this.productForm.value)
        this.router.navigate(['/admin/manage']);
        }, error => {
        });

      }
    })


  }




}
