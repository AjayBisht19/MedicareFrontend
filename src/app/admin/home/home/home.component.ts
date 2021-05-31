import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listData:MatTableDataSource<any>
  searchKey:string;
  constructor( private adminService:AdminService) { }
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
 
  ngOnInit(): void {
    this.adminService.getProducts().subscribe((data: any) => {
     this.listData=new MatTableDataSource(data)  ;
     this.listData.sort=this.sort;
     this.listData.paginator=this.paginator;
    })
  }

  displayedColumns: string[] = [ 'name', 'unit price', 'quantity'];
  
applyFilter(e){
  this.listData.filter=this.searchKey.trim().toLowerCase()
}
}
