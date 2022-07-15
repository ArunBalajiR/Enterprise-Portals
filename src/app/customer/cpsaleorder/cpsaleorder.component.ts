import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-cpsaleorder',
  templateUrl: './cpsaleorder.component.html',
  styleUrls: ['./cpsaleorder.component.css']
})
export class CpsaleorderComponent implements OnInit {
  searchKey:any;
  customerId:any;
  page:number=1;
  constructor(public router: Router,public network:NetworkService) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem("customerId");
    console.log(this.customerId);
    this.network.getSaleorderData(this.customerId);
  }

  get saleorderData() {
    return this.network.saleData;
  }

  getColor(status: string): string{
    return status === "Completed" ? "green" : "red";
  }

  navToCustomerDashboard(): void {
    this.router.navigate(['/customerdashboard']);
  }

  navToProfile(){
    this.router.navigate(['/profile']);
  }

  logOut(): void {
    localStorage.clear();
    this.network.logoutClearCache();
    this.router.navigate(['/customer'])
  }

  navToDelivery(){
    this.router.navigate(['/delivery'])
  }

  navToInquiry(){
    this.router.navigate(['/inquiry'])
  }

  navToSaleorder(){
  }

}
