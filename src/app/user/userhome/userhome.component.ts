import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/admin/manage/product';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  constructor(private userService:UserService) { }

  products: product[] = [];
  categories: [];
  main: product;
  search:String;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  allProducts: boolean;
  disDate = false;
  disPrice = false;

  ngOnInit(): void {
    this.userService.getProducts().subscribe((data: any) => {
      this.products = [];
      data.forEach((pro: product) => {
        this.main = pro
        this.retrieveResonse = pro.image;
        this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
        this.main.visibilty=true
        this.products.push(this.main);
      })
    },error=>{
      console.log("error ",error);
    })

    this.userService.getCategories().subscribe((data: any) => {
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

  date() {
    this.disDate = true;
    this.disPrice = false;
    this.ngOnInit();
  }

  price() {
    this.disDate = false;
    this.disPrice = true;
    this.userService.sortByPrice().subscribe((data: any) => {
      this.products = [];
      data.forEach((pro: product) => {
        this.main = pro
        this.retrieveResonse = pro.image;
        this.main.image = 'data:image/jpeg;base64,' + this.retrieveResonse;
        this.main.visibilty=true
        this.products.push(this.main);
      })
    })
  }

  
  showAll(){
    this.allProducts = true;
    this.products.forEach(element => {
      element.visibilty=true
    });
  }

  byCategory(category) {
    this.disDate = false;
    this.disPrice = false;
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



}
