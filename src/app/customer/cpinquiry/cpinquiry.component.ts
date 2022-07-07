import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
@Component({
  selector: 'app-cpinquiry',
  templateUrl: './cpinquiry.component.html',
  styleUrls: ['./cpinquiry.component.css']
})
export class CpinquiryComponent implements OnInit {

  searchKey:any;
  customerId:any;

  page:number=1;
  constructor(public router: Router,public network:NetworkService) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem("customerId");
    this.network.getInquiryData(this.customerId);
  }

  get inquiryData() {
    return this.network.inqData;
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
    this.router.navigate(['/delivery'])
  }

  navToInquiry(){

  }

  navToSaleorder(){
    this.router.navigate(['/saleorder'])
  }


}
