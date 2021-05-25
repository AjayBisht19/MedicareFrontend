import { product } from './../product';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  constructor(private httpClient: HttpClient,private router: Router,@Inject(MAT_DIALOG_DATA) public data:any, private snack: MatSnackBar) { }

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
    if(this.selectedFile==undefined){
      this.snack.open('Image is compulsory', 'OK', {
        duration: 2000
      });
    }
    const uploadImageData = new FormData();
    uploadImageData.append('image', this.selectedFile, this.selectedFile.name); 
    this.productForm['image'] = uploadImageData;   
    console.log("selected file-- ", this.selectedFile);

  
    this.httpClient.post(`http://localhost:8080/admin/product/${this.data.id}/editImage`, uploadImageData,{responseType:"text"}).subscribe((data: any) => {
    //  }, (data: any) => {
      console.log("response status ", data)
      if (data) {
        this.httpClient.post(`http://localhost:8080/admin/product/${this.data.id}/editData`, this.productForm.value).toPromise().then(data => {
          console.log("product form " ,this.productForm.value)
          swal.fire('Product updated', "", 'success');
          window.location.reload();
        });

      }
    },error=>{
      this.snack.open('Image is compulsory', 'OK', {
        duration: 2000
      });
    })
  }
}
