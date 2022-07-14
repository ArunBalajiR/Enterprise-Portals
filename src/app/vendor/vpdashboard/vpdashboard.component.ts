import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-vpdashboard',
  templateUrl: './vpdashboard.component.html',
  styleUrls: ['./vpdashboard.component.css']
})
export class VpdashboardComponent implements OnInit {

  vendorName: any;
  vendorId: any;


  constructor(
    private http: HttpClient,
    public router: Router,
    private network: NetworkService

    ) { }

  ngOnInit(): void {

    this.vendorName = localStorage.getItem('vendorName');
    this.vendorId = localStorage.getItem('vendorId');

    // this.network.getDeliveryData(this.vendorId);
    // this.network.getSaleorderData(this.vendorId);
    // this.network.getInquiryData(this.vendorId);

  }


  get goodsreceiptCount(){
    return this.network.delCount;
  }

  get purchaseorderCount(){
    return this.network.saleCount;
  }

  get quotationCount(){
    return this.network.inqCount;
  }



  logOut() {
    localStorage.clear();
    this.router.navigate(['/customer'])
  }
  navToVendorProfile() {
    this.router.navigate(['/profile'])
  }

  navToVendorDashboard() {

  }

  navToCredit() {
    this.router.navigate(['/credit'])
  }

  navToDebit() {
    this.router.navigate(['/debit'])
  }

  navToQuotation() {
    this.router.navigate(['/delivery'])
  }

  navToPurchaseOrder() {
    this.router.navigate(['/inquiry'])
  }

  navToGoodsReceipt() {
    this.router.navigate(['/saleorder'])
  }

  navToInvoice(){
    this.router.navigate(['/invoice']);
  }

  navToPayment(){
    this.router.navigate(['/payment']);
  }

}
