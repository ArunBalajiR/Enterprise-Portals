import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NetworkService } from 'src/app/services/network.service';
@Component({
  selector: 'app-cpdashboard',
  templateUrl: './cpdashboard.component.html',
  styleUrls: ['./cpdashboard.component.css']
})
export class CpdashboardComponent implements OnInit {
  customerName: any;
  customerId: any;


  constructor(
    private http: HttpClient,
    public router: Router,
    private network: NetworkService

    ) { }

  ngOnInit(): void {

    this.customerName = localStorage.getItem('customerName');
    this.customerId = localStorage.getItem('customerId');

    this.network.getDeliveryData(this.customerId);
    this.network.getSaleorderData(this.customerId);
    this.network.getInquiryData(this.customerId);

  }


  get deliveryCount(){
    return this.network.delCount;
  }

  get saleorderCount(){
    return this.network.saleCount;
  }

  get inquiryCount(){
    return this.network.inqCount;
  }



  logOut() {
    localStorage.clear();
    this.network.logoutClearCache();
    this.router.navigate(['/customer'])
  }
  navToProfile() {
    this.router.navigate(['/profile'])
  }

  navToCustomerDashboard() {

  }

  navToCredit() {
    this.router.navigate(['/credit'])
  }

  navToDebit() {
    this.router.navigate(['/debit'])
  }

  navToDelivery() {
    this.router.navigate(['/delivery'])
  }

  navToInquiry() {
    this.router.navigate(['/inquiry'])
  }

  navToSaleorder() {
    this.router.navigate(['/saleorder'])
  }

  navToInvoice(){
    this.router.navigate(['/invoice']);
  }

  navToPayment(){
    this.router.navigate(['/payment']);
  }
}
