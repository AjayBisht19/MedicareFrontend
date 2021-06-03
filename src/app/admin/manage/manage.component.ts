import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import { product } from './product';
import { AddproductComponent } from './addproduct/addproduct.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  openDialog() {
    this.dialog.open(AddproductComponent);
  }

  constructor(private dialog: MatDialog,private adminService:AdminService, private router: Router, private snack: MatSnackBar) {

  }
  products: product[] = [];
  categories: [];
  main: product;
  search: String;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  allProducts: boolean;
  disDate = true;
  disPrice = false;
  disName=false

  ngOnInit(): void {
    
    this.adminService.getProducts().subscribe((data: any) => {
      this.products = [];
      data.forEach((pro: product) => {
        this.main = pro
        this.retrieveResonse = pro.image;
        this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
        this.main.visibilty=true
        this.products.push(this.main);
      })
    })

    this.adminService.getCategories().subscribe((data: any) => {
      this.categories = data;
    })
  }

  searchBy(){
    this.products.forEach(element => {
      if(element.name.toUpperCase().indexOf(this.search.toUpperCase())>-1){
        console.log(element.name) 
        element.visibilty=true       
      }else{
        element.visibilty=false
      }
      
    });
  }



  delete(id) {
    console.log(id);
    this.adminService.deleteProduct(id).subscribe(data => {
    })
    window.location.reload();
    this.snack.open('Item deleted', 'OK', {
      duration: 2000
    });
  }

  active(id) {
    this.adminService.toggleActivate(id).subscribe(data => {
      this.snack.open('Status changed', 'OK', {
        duration: 2000
      });
    });
  }

  name(){
    this.disDate = false;
    this.disPrice = false;
    this.disName=true
    this.products.sort(this.compareName)

  }

  date() {
    this.disDate = true;
    this.disPrice = false;
    this.disName=false
    this.products.sort(this.compareDate)
  }

  price() {
    this.disDate = false;
    this.disPrice = true;
    this.disName=false;
    this.products.sort(this.compare)

  }

  showAll(){
    this.allProducts = true;
    this.products.forEach(element => {
      element.visibilty=true
    });
  }

  byCategory(category) {
    this.allProducts = false;
    this.products.forEach(element => {
      if(element.category===category){
        console.log(element.name) 
        element.visibilty=true       
      }else{
        element.visibilty=false
      }
      
    });

  }
  compare(a, b) {
    const productA = a.price;
    const productB = b.price;
  
    let comparison = 0;
    if (productA > productB) {
      comparison = 1;
    } else if (productA < productB) {
      comparison = -1;
    }
    return comparison;
  }

  compareDate(a, b) {
    const productA = a.date;
    const productB = b.date;
  
    let comparison = 0;
    if (productA > productB) {
      comparison = 1;
    } else if (productA < productB) {
      comparison = -1;
    }
    return comparison;
  }

  compareName(a, b) {
    const productA = a.name;
    const productB = b.name;
  
    let comparison = 0;
    if (productA > productB) {
      comparison = 1;
    } else if (productA < productB) {
      comparison = -1;
    }
    return comparison;
  }
}
