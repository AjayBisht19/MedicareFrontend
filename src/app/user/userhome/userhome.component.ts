import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/admin/manage/product';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  constructor(private userService: UserService,private snackbar:MatSnackBar) { }

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
  disName = false;
  loading:boolean=true;
  ngOnInit(): void {
  
      this.userService.getProducts().subscribe((data: any) => {
        this.products = [];
        data.forEach((pro: product) => {
          this.main = pro
          this.retrieveResonse = pro.image;
          this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
          this.main.visibilty = true
          this.products.push(this.main);
        })
        this.loading=false
      }, error => {
        console.log("error ", error);
        this.snackbar.open('Something went wrong!!' ,'OK', {
          duration: 2000
        })

      })
     

    this.userService.getCategories().subscribe((data: any) => {
      this.categories = data;
    })
  }

  searchBy() {
    this.products.forEach(element => {
      if (element.name.toUpperCase().indexOf(this.search.toUpperCase()) > -1) {
        console.log(element.name)
        element.visibilty = true
      } else {
        element.visibilty = false
      }

    });
  }

  name() {
    this.disDate = false;
    this.disPrice = false;
    this.disName = true
    this.products.sort(this.compareName)

  }

  date() {
    this.disDate = true;
    this.disPrice = false;
    this.disName = false
    this.products.sort(this.compareDate)
  }

  price() {
    this.disDate = false;
    this.disPrice = true;
    this.disName = false;
    this.products.sort(this.compare)
  }


  showAll() {
    this.allProducts = true;
    this.products.forEach(element => {
      element.visibilty = true
    });
  }

  byCategory(category) {
    this.disDate = false;
    this.disPrice = false;
    this.allProducts = false;
    this.products.forEach(element => {
      if (element.category === category) {
        console.log(element.name)
        element.visibilty = true
      } else {
        element.visibilty = false
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
