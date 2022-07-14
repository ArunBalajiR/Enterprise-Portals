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

    this.network.getQuotationData(this.vendorId);
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
    return this.network.quotCount;
  }



  logOut() {
    localStorage.clear();
    this.router.navigate(['/vendor'])
  }
  navToVendorProfile() {
    this.router.navigate(['/vprofile'])
  }

  navToVendorDashboard() {

  }

  navToCredit() {
    this.router.navigate(['/vcredit'])
  }

  navToDebit() {
    this.router.navigate(['/vdebit'])
  }

  navToQuotation() {
    this.router.navigate(['/quotation'])
  }

  navToPurchaseOrder() {
    this.router.navigate(['/po'])
  }

  navToGoodsReceipt() {
    this.router.navigate(['/goodsreceipt'])
  }

  navToInvoice(){
    this.router.navigate(['/vinvoice']);
  }

  navToPayment(){
    this.router.navigate(['/vpayment']);
  }

}