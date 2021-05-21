import { HttpClient } from '@angular/common/http';
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
  constructor(private httpClient: HttpClient,private router: Router, private snack: MatSnackBar) { }

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
    console.log("----------------------")
    console.log(this.productForm.value)
    const uploadImageData = new FormData();
    console.log("data --- ");

    console.log(this.productForm.value)
    uploadImageData.append('image', this.selectedFile, this.selectedFile.name);
    
    this.productForm['image'] = uploadImageData;
    this.httpClient.post('http://localhost:8080/admin/upload/', uploadImageData,{responseType:"text"}).subscribe((data: any) => {
      console.log("response status ", data.status)
      console.log("Data : ",data)
      if (data) {
        this.httpClient.post('http://localhost:8080/admin/uploadData/', this.productForm.value).toPromise().then(data => {
          console.log(data)
          swal.fire('Product added', "", 'success');
          window.location.reload();
        }, error => {
          console.error("error : ",error)
          this.snack.open('Image is compulsory', 'OK', {
            duration: 2000
          });
        });

      }
    },error=>{
      this.snack.open('Image is compulsory', 'OK', {
        duration: 2000
      });
    })


  }


}
