import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private http: HttpClient) { }

  orders:object[];

  ngOnInit(): void {
    this.http.get(`http://localhost:8080/user/getOrderProducts`).subscribe((data:any)=>{
      console.log(data);
      this.orders=data
    })
  }

}
