import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  selectedFile: File;
  message: String;

  productForm: FormGroup;
  constructor(private httpClient: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
      desc: new FormControl(''),
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
    this.httpClient.post('http://localhost:8080/admin/upload/', uploadImageData).subscribe((dat: any) => {
      
     }, (data: any) => {
      console.log("response status ", data.status)
      if (data.status == 200) {
        this.httpClient.post('http://localhost:8080/admin/uploadData/', this.productForm.value).toPromise().then(data => {
          console.log("111111111111111")
          console.log(data)
          this.router.navigate(['/admin']);
        }, error => {
        });

      }
    })


  }


}
