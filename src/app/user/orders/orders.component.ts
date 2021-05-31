import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private userService:UserService) { }

  orders:object[];

  ngOnInit(): void {
    this.userService.orderedProducts().subscribe((data:any)=>{
      console.log(data);
      this.orders=data
    })
  }

}
