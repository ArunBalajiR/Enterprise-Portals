import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-cpdelivery',
  templateUrl: './cpdelivery.component.html',
  styleUrls: ['./cpdelivery.component.css']
})
export class CpdeliveryComponent implements OnInit {
  searchKey:any;
  customerId:any;
  page:number=1;
  constructor(
    public router: Router,
    public network:NetworkService,


  ) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem("customerId");
    this.network.getDeliveryData(this.customerId);
  }

  get deliveryDataArray(){
    return this.network.delData;
  }

  navToCustomerDashboard(): void {
    this.router.navigate(['/customerdashboard']);
  }

  navToProfile(){
    this.router.navigate(['/profile']);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/customer'])
  }

  navToDelivery(){
  }

  navToInquiry(){
    this.router.navigate(['/inquiry'])
  }

  navToSaleorder(){
    this.router.navigate(['/saleorder'])
  }

}
